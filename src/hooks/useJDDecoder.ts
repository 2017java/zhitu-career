"use client";

import { useState, useCallback } from "react";
import { analyzeJD } from "@/lib/jd-decoder/analyzer";
import type { JDAnalysisResult } from "@/lib/jd-decoder/types";
import { storage, STORAGE_KEYS } from "@/lib/storage";
import { useJourney } from "./useJourney";

export function useJDDecoder() {
  const [result, setResult] = useState<JDAnalysisResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [mode, setMode] = useState<'ai' | 'fallback'>('ai');
  const { getStage, setStage } = useJourney();

  const analyze = useCallback(async (jdText: string) => {
    setLoading(true);
    setError(null);
    try {
      const { data, mode: usedMode } = await analyzeJD(jdText);
      setResult(data);
      setMode(usedMode);

      // Save to history
      const history = storage.get<Array<{ id: string; text: string; result: JDAnalysisResult; mode: string; createdAt: string }>>(STORAGE_KEYS.JD_ANALYSES) || [];
      history.unshift({
        id: Date.now().toString(),
        text: jdText.slice(0, 100),
        result: data,
        mode: usedMode,
        createdAt: new Date().toISOString(),
      });
      storage.set(STORAGE_KEYS.JD_ANALYSES, history.slice(0, 20));

      // Update journey stage
      if (history.length >= 2) {
        setStage(2); // Unlock "差距研判者"
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : '分析失败，请重试');
    } finally {
      setLoading(false);
    }
  }, [setStage]);

  const reset = useCallback(() => {
    setResult(null);
    setError(null);
    setMode('ai');
  }, []);

  return { result, loading, error, mode, analyze, reset };
}
