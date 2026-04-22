"use client";

import { useState, useCallback } from "react";
import { questions } from "@/lib/assessment/questions";
import { processAssessment, type AssessmentAnswers } from "@/lib/assessment";
import type { AssessmentResult, ScenarioCard } from "@/lib/assessment/types";
import { storage, STORAGE_KEYS } from "@/lib/storage";
import { useJourney } from "./useJourney";

type AssessmentPhase = 'welcome' | 'holland' | 'mbti' | 'value' | 'softskill' | 'loading' | 'result';

export function useAssessment() {
  const [phase, setPhase] = useState<AssessmentPhase>('welcome');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<AssessmentAnswers>(new Map());
  const [result, setResult] = useState<AssessmentResult | null>(null);
  const { setStage } = useJourney();

  const phaseQuestions: Record<string, ScenarioCard[]> = {
    holland: questions.filter((q) => q.type === 'holland'),
    mbti: questions.filter((q) => q.type === 'mbti'),
    value: questions.filter((q) => q.type === 'value'),
    softskill: questions.filter((q) => q.type === 'softskill'),
  };

  const currentQuestions = phase !== 'welcome' && phase !== 'loading' && phase !== 'result'
    ? phaseQuestions[phase] || []
    : [];

  const currentQuestion = currentQuestions[currentIndex];
  const totalInPhase = currentQuestions.length;
  const progressInPhase = totalInPhase > 0 ? ((currentIndex) / totalInPhase) * 100 : 0;

  const totalQuestions = questions.length;
  const answeredCount = answers.size;
  const totalProgress = totalQuestions > 0 ? (answeredCount / totalQuestions) * 100 : 0;

  const handleAnswer = useCallback((questionId: string, optionIndex: number) => {
    const newAnswers = new Map(answers);
    newAnswers.set(questionId, optionIndex);
    setAnswers(newAnswers);

    // Check if we need to move to next phase
    const currentPhaseQuestions = phaseQuestions[phase] || [];
    if (currentIndex >= currentPhaseQuestions.length - 1) {
      // Move to next phase
      const phaseOrder: AssessmentPhase[] = ['holland', 'mbti', 'value', 'softskill'];
      const currentPhaseIdx = phaseOrder.indexOf(phase);
      if (currentPhaseIdx < phaseOrder.length - 1) {
        setPhase(phaseOrder[currentPhaseIdx + 1]);
        setCurrentIndex(0);
      } else {
        // All done - process results
        setPhase('loading');
        setTimeout(() => {
          const processed = processAssessment(questions, newAnswers);
          setResult(processed as AssessmentResult);
          storage.set(STORAGE_KEYS.ASSESSMENT_RESULT, processed);
          setStage(1); // Unlock "方向确认者"
          setPhase('result');
        }, 1500);
      }
    } else {
      setCurrentIndex((prev) => prev + 1);
    }
  }, [answers, currentIndex, phase, phaseQuestions, setStage]);

  const reset = useCallback(() => {
    setPhase('welcome');
    setCurrentIndex(0);
    setAnswers(new Map());
    setResult(null);
  }, []);

  return {
    phase,
    currentQuestion,
    currentIndex,
    totalInPhase,
    progressInPhase,
    totalProgress,
    answeredCount,
    totalQuestions,
    result,
    handleAnswer,
    startAssessment: () => setPhase('holland'),
    reset,
  };
}
