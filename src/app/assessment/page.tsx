"use client";

import { useAssessment } from "@/hooks/useAssessment";
import { cn } from "@/lib/utils";

export default function AssessmentPage() {
  const {
    phase,
    currentQuestion,
    currentIndex,
    totalInPhase,
    progressInPhase,
    totalProgress,
    handleAnswer,
    startAssessment,
  } = useAssessment();

  // Welcome phase
  if (phase === 'welcome') {
    return (
      <div className="min-h-[calc(100vh-120px)] flex items-center justify-center px-6">
        <div className="text-center max-w-md">
          <div className="text-6xl mb-6">🧭</div>
          <h1 className="font-serif text-3xl md:text-4xl font-medium text-near-black mb-4">
            职业星图测评
          </h1>
          <p className="text-olive-gray leading-relaxed mb-3">
            通过一系列职场小剧场场景，探索你的职业性格、兴趣方向和核心能力。
          </p>
          <div className="bg-ivory border border-border-cream rounded-xl p-4 mb-8 text-left">
            <p className="text-sm text-charcoal-warm space-y-2">
              <span className="block">📝 共 <strong>43</strong> 道场景题，约 5-8 分钟</span>
              <span className="block">🧩 包含 Holland 职业兴趣 + MBTI 人格 + 价值观 + 软技能</span>
              <span className="block">🌟 完成后解锁你的专属「职业星图」</span>
            </p>
          </div>
          <button
            onClick={startAssessment}
            className="w-full py-4 bg-terracotta text-ivory rounded-xl text-base font-medium hover:bg-coral active:scale-[0.98] transition-all shadow-lg shadow-terracotta/20 cursor-pointer"
          >
            开始探索 ✨
          </button>
        </div>
      </div>
    );
  }

  // Loading phase
  if (phase === 'loading') {
    return (
      <div className="min-h-[calc(100vh-120px)] flex items-center justify-center px-6">
        <div className="text-center">
          <div className="relative w-20 h-20 mx-auto mb-6">
            <div className="absolute inset-0 border-4 border-border-warm rounded-full" />
            <div className="absolute inset-0 border-4 border-transparent border-t-terracotta rounded-full animate-spin" />
            <div className="absolute inset-0 flex items-center justify-center text-2xl">🌟</div>
          </div>
          <h2 className="font-serif text-xl text-near-black mb-2">正在生成你的星图...</h2>
          <p className="text-sm text-stone-gray">分析你的职业性格和方向</p>
        </div>
      </div>
    );
  }

  // Result phase - redirect
  if (phase === 'result') {
    if (typeof window !== 'undefined') {
      window.location.href = '/assessment/result';
    }
    return null;
  }

  // Question phases
  const phaseLabels: Record<string, string> = {
    holland: '职业兴趣探索',
    mbti: '人格倾向探测',
    value: '价值观排序',
    softskill: '软技能评估',
  };

  return (
    <div className="min-h-[calc(100vh-120px)] flex flex-col px-4 md:px-6 py-6 max-w-lg mx-auto w-full">
      {/* Progress bar */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-medium text-terracotta uppercase tracking-wider">
            {phaseLabels[phase]}
          </span>
          <span className="text-xs text-stone-gray">
            {currentIndex + 1} / {totalInPhase}
          </span>
        </div>
        <div className="h-2 bg-border-warm rounded-full overflow-hidden">
          <div
            className="h-full bg-terracotta rounded-full transition-all duration-300"
            style={{ width: `${progressInPhase}%` }}
          />
        </div>
        {/* Total progress */}
        <div className="mt-2 flex items-center gap-2">
          <div className="flex-1 h-1 bg-border-cream rounded-full overflow-hidden">
            <div
              className="h-full bg-terracotta/40 rounded-full transition-all duration-300"
              style={{ width: `${totalProgress}%` }}
            />
          </div>
          <span className="text-[10px] text-stone-gray">总进度 {Math.round(totalProgress)}%</span>
        </div>
      </div>

      {/* Question Card */}
      {currentQuestion && (
        <div className="flex-1 flex flex-col">
          {/* Scene card */}
          <div className="bg-ivory border border-border-cream rounded-2xl p-6 md:p-8 shadow-sm mb-6 flex-1">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-2xl">{currentQuestion.emoji}</span>
              <span className="text-sm font-medium text-terracotta">{currentQuestion.scene}</span>
            </div>
            <p className="text-base text-charcoal-warm leading-relaxed">
              {currentQuestion.scenario}
            </p>
          </div>

          {/* Options */}
          <div className="space-y-3">
            {currentQuestion.options.map((option, idx) => (
              <button
                key={idx}
                onClick={() => handleAnswer(currentQuestion.id, idx)}
                className="w-full text-left p-4 bg-ivory border border-border-cream rounded-xl hover:border-terracotta/40 hover:shadow-sm active:scale-[0.98] active:bg-parchment transition-all duration-200 cursor-pointer"
              >
                <span className="text-sm text-charcoal-warm leading-relaxed">
                  {option.text}
                </span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
