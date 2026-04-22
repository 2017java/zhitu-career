"use client";

import Link from "next/link";

export default function MatchPage() {
  return (
    <div className="min-h-[calc(100vh-120px)] flex items-center justify-center px-6">
      <div className="text-center max-w-md">
        <div className="text-6xl mb-6">📊</div>
        <h1 className="font-serif text-3xl font-medium text-near-black mb-4">
          岗位匹配度分析
        </h1>
        <p className="text-olive-gray leading-relaxed mb-3">
          量化你与目标岗位的差距，给出可执行的改进路线。
        </p>
        <div className="bg-ivory border border-border-cream rounded-xl p-5 mb-8 text-left space-y-3">
          <p className="text-sm text-charcoal-warm">✅ 对话式收集你的技能和经历</p>
          <p className="text-sm text-charcoal-warm">✅ AI 加权评分模型（5 个维度）</p>
          <p className="text-sm text-charcoal-warm">✅ 差距分析 + 具体改进计划</p>
          <p className="text-sm text-charcoal-warm">✅ 雷达图可视化匹配维度</p>
        </div>
        <div className="bg-terracotta/5 border border-terracotta/20 rounded-xl p-4 mb-6">
          <p className="text-sm text-terracotta font-medium">🚧 功能开发中，敬请期待</p>
          <p className="text-xs text-stone-gray mt-1">请先完成「职业测评」和「JD 解读」模块</p>
        </div>
        <div className="flex gap-3 justify-center">
          <Link
            href="/assessment"
            className="px-6 py-3 bg-terracotta text-ivory rounded-xl text-sm font-medium hover:bg-coral transition-colors"
          >
            去做测评
          </Link>
          <Link
            href="/jd-decoder"
            className="px-6 py-3 bg-ivory text-near-black rounded-xl text-sm font-medium border border-border-warm hover:border-terracotta/30 transition-colors"
          >
            去解读 JD
          </Link>
        </div>
      </div>
    </div>
  );
}
