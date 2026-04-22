"use client";

import Link from "next/link";

export default function ResumePage() {
  return (
    <div className="min-h-[calc(100vh-120px)] flex items-center justify-center px-6">
      <div className="text-center max-w-md">
        <div className="text-6xl mb-6">📄</div>
        <h1 className="font-serif text-3xl font-medium text-near-black mb-4">
          简历智能优化
        </h1>
        <p className="text-olive-gray leading-relaxed mb-3">
          上传简历，AI 对标 JD 给出具体修改建议。
        </p>
        <div className="bg-ivory border border-border-cream rounded-xl p-5 mb-8 text-left space-y-3">
          <p className="text-sm text-charcoal-warm">✅ 支持 PDF / Word 格式上传</p>
          <p className="text-sm text-charcoal-warm">✅ 关键词覆盖率分析</p>
          <p className="text-sm text-charcoal-warm">✅ STAR 结构检查</p>
          <p className="text-sm text-charcoal-warm">✅ 具体改写示例（原文 → 优化版）</p>
        </div>
        <div className="bg-terracotta/5 border border-terracotta/20 rounded-xl p-4 mb-6">
          <p className="text-sm text-terracotta font-medium">🚧 功能开发中，敬请期待</p>
          <p className="text-xs text-stone-gray mt-1">请先完成「JD 解读」获取目标岗位分析</p>
        </div>
        <Link
          href="/jd-decoder"
          className="inline-flex px-6 py-3 bg-terracotta text-ivory rounded-xl text-sm font-medium hover:bg-coral transition-colors"
        >
          先去解读 JD
        </Link>
      </div>
    </div>
  );
}
