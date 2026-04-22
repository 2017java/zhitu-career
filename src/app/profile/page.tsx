"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { storage, STORAGE_KEYS } from "@/lib/storage";
import { useJourney, JOURNEY_STAGES } from "@/hooks/useJourney";
import type { AssessmentResult } from "@/lib/assessment/types";
import type { JDAnalysisResult } from "@/lib/jd-decoder/types";

export default function ProfilePage() {
  const { getStage } = useJourney();
  const [stage, setStage] = useState(0);
  const [assessmentResult, setAssessmentResult] = useState<AssessmentResult | null>(null);
  const [jdHistory, setJdHistory] = useState<Array<{ id: string; text: string; result: JDAnalysisResult; mode: string; createdAt: string }>>([]);

  useEffect(() => {
    setStage(getStage());
    setAssessmentResult(storage.get<AssessmentResult>(STORAGE_KEYS.ASSESSMENT_RESULT));
    setJdHistory(storage.get(STORAGE_KEYS.JD_ANALYSES) || []);
  }, [getStage]);

  return (
    <div className="max-w-3xl mx-auto px-6 md:px-12 py-10 pb-24 md:pb-10">
      <div>
        <h1 className="font-serif text-3xl font-medium text-near-black mb-2">个人中心</h1>
        <p className="text-sm text-stone-gray mb-8">你的求职星图探索记录</p>

        {/* Journey Badges */}
        <div className="bg-ivory border border-border-cream rounded-2xl p-6 mb-6">
          <h2 className="font-serif text-lg font-medium text-near-black mb-4">🌟 探索徽章</h2>
          <div className="flex flex-wrap gap-4">
            {JOURNEY_STAGES.map((s) => (
              <div
                key={s.stage}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl border transition-all ${
                  s.stage <= stage
                    ? 'border-terracotta/30 bg-terracotta/5'
                    : 'border-border-cream bg-parchment opacity-50'
                }`}
              >
                <span className="text-2xl">{s.icon}</span>
                <div>
                  <p className={`text-sm font-medium ${s.stage <= stage ? 'text-near-black' : 'text-stone-gray'}`}>
                    {s.name}
                  </p>
                  <p className="text-[11px] text-stone-gray">{s.description.split('\n')[0]}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Assessment Result */}
        {assessmentResult && (
          <div className="bg-ivory border border-border-cream rounded-2xl p-6 mb-6">
            <h2 className="font-serif text-lg font-medium text-near-black mb-4">🧭 最近测评</h2>
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-terracotta/10 flex items-center justify-center">
                <span className="font-serif text-lg font-medium text-terracotta">
                  {assessmentResult.hollandCode}
                </span>
              </div>
              <div>
                <p className="text-sm font-medium text-near-black">
                  {assessmentResult.mbtiType} · {assessmentResult.hollandCode}
                </p>
                <p className="text-xs text-stone-gray">
                  {new Date(assessmentResult.createdAt).toLocaleDateString('zh-CN')}
                </p>
              </div>
              <Link href="/assessment/result" className="ml-auto text-sm text-terracotta hover:underline">
                查看详情 →
              </Link>
            </div>
          </div>
        )}

        {/* JD History */}
        {jdHistory.length > 0 && (
          <div className="bg-ivory border border-border-cream rounded-2xl p-6 mb-6">
            <h2 className="font-serif text-lg font-medium text-near-black mb-4">🔍 JD 解读记录</h2>
            <div className="space-y-3">
              {jdHistory.slice(0, 5).map((item) => (
                <div key={item.id} className="flex items-center gap-3 p-3 bg-parchment rounded-lg">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-charcoal-warm truncate">{item.text}...</p>
                    <p className="text-[11px] text-stone-gray">
                      {new Date(item.createdAt).toLocaleDateString('zh-CN')} · {item.mode === 'ai' ? 'AI 解读' : '关键词分析'}
                    </p>
                  </div>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    item.result.fresherFriendly === 1 ? 'bg-success-sage/12 text-success-sage' :
                    item.result.fresherFriendly === 2 ? 'bg-terracotta/12 text-terracotta' :
                    'bg-error-crimson/12 text-error-crimson'
                  }`}>
                    {item.result.fresherFriendly === 1 ? '🟢 友好' : item.result.fresherFriendly === 2 ? '🟡 一般' : '🔴 较难'}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Empty state */}
        {!assessmentResult && jdHistory.length === 0 && (
          <div className="text-center py-16">
            <span className="text-5xl block mb-4">🗺️</span>
            <h3 className="font-serif text-xl text-near-black mb-2">还没有探索记录</h3>
            <p className="text-sm text-stone-gray mb-6">开始你的职业星图探索之旅吧！</p>
            <Link
              href="/assessment"
              className="inline-flex px-6 py-3 bg-terracotta text-ivory rounded-xl text-sm font-medium hover:bg-coral transition-colors"
            >
              开始测评
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
