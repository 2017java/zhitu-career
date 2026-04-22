"use client";

import { useEffect, useState } from "react";
import { useJourney, JOURNEY_STAGES, type JourneyStage } from "@/hooks/useJourney";
import { cn } from "@/lib/utils";
import Link from "next/link";

export function JourneyProgress() {
  const { getStage, getProgress } = useJourney();
  const [stage, setStage] = useState<JourneyStage>(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    setStage(getStage());
    setProgress(getProgress());
  }, [getStage, getProgress]);

  // SVG circle params
  const radius = 54;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <div className="bg-ivory border border-border-cream rounded-2xl p-8 shadow-sm">
      <h2 className="font-serif text-2xl font-medium text-near-black mb-6">
        🌟 我的求职星图
      </h2>

      {/* Progress Ring */}
      <div className="flex items-center gap-8 mb-8">
        <div className="relative w-32 h-32 flex-shrink-0">
          <svg className="w-full h-full -rotate-90" viewBox="0 0 120 120">
            <circle
              cx="60" cy="60" r={radius}
              fill="none"
              stroke="var(--color-border-warm)"
              strokeWidth="8"
            />
            <circle
              cx="60" cy="60" r={radius}
              fill="none"
              stroke="var(--color-terracotta)"
              strokeWidth="8"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              className="transition-all duration-1000 ease-out"
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-2xl font-serif font-medium text-terracotta">{progress}%</span>
            <span className="text-[10px] text-stone-gray">探索进度</span>
          </div>
        </div>

        <div className="flex-1">
          <p className="text-sm text-olive-gray mb-1">当前阶段</p>
          <p className="font-serif text-lg font-medium text-near-black">
            {JOURNEY_STAGES[stage].icon} {JOURNEY_STAGES[stage].name}
          </p>
          <p className="text-xs text-stone-gray mt-1 whitespace-pre-line">
            {JOURNEY_STAGES[stage].description}
          </p>
        </div>
      </div>

      {/* Stage Badges */}
      <div className="flex items-center justify-between mb-8 relative">
        <div className="absolute top-6 left-8 right-8 h-[2px] bg-border-warm" />
        {JOURNEY_STAGES.map((s) => (
          <div key={s.stage} className="relative z-10 flex flex-col items-center">
            <div
              className={cn(
                "w-12 h-12 rounded-full flex items-center justify-center text-lg border-2 transition-all duration-300",
                s.stage <= stage
                  ? "border-terracotta bg-terracotta/10"
                  : "border-border-warm bg-parchment"
              )}
            >
              {s.icon}
            </div>
            <span className={cn(
              "text-[11px] font-medium mt-2 text-center",
              s.stage <= stage ? "text-near-black" : "text-stone-gray"
            )}>
              {s.name}
            </span>
          </div>
        ))}
      </div>

      {/* Quick Entry Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          { href: "/assessment", label: "职业测评", icon: "🧭", desc: "探索你的职业星图" },
          { href: "/jd-decoder", label: "JD解读", icon: "🔍", desc: "看懂招聘要求" },
          { href: "/match", label: "匹配分析", icon: "📊", desc: "量化岗位差距" },
          { href: "/resume", label: "简历优化", icon: "📄", desc: "AI 帮你改简历" },
        ].map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="group p-4 bg-parchment rounded-xl border border-border-cream hover:border-terracotta/30 hover:shadow-md transition-all duration-200"
          >
            <span className="text-2xl block mb-2">{item.icon}</span>
            <p className="text-sm font-medium text-near-black group-hover:text-terracotta transition-colors">
              {item.label}
            </p>
            <p className="text-[11px] text-stone-gray mt-1">{item.desc}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
