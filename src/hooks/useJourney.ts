"use client";

import { useCallback } from "react";
import { storage, STORAGE_KEYS } from "@/lib/storage";

export type JourneyStage = 0 | 1 | 2 | 3 | 4;

export const JOURNEY_STAGES = [
  { stage: 0 as const, name: "星图探索者", icon: "🌑", description: "完成性格测评\n解锁第一颗星" },
  { stage: 1 as const, name: "方向确认者", icon: "🌒", description: "解读 2+ 份 JD\n明确职业方向" },
  { stage: 2 as const, name: "差距研判者", icon: "🌓", description: "完成匹配分析\n建立改进计划" },
  { stage: 3 as const, name: "简历炼金师", icon: "🌔", description: "优化并通过\n简历评估 ≥70 分" },
  { stage: 4 as const, name: "求职冠军", icon: "🌕", description: "完成全流程\n解锁星图全貌" },
];

export function useJourney() {
  const getStage = useCallback((): JourneyStage => {
    return storage.get<JourneyStage>(STORAGE_KEYS.JOURNEY_STAGE) ?? 0;
  }, []);

  const setStage = useCallback((stage: JourneyStage) => {
    const current = getStage();
    if (stage > current) {
      storage.set(STORAGE_KEYS.JOURNEY_STAGE, stage);
    }
  }, [getStage]);

  const getProgress = useCallback((): number => {
    const stage = getStage();
    return Math.round((stage / 4) * 100);
  }, [getStage]);

  return { getStage, setStage, getProgress };
}
