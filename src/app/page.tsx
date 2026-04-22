"use client";

import Link from "next/link";
import { JourneyProgress } from "@/components/common/JourneyProgress";
import { useEffect, useState } from "react";
import { storage, STORAGE_KEYS } from "@/lib/storage";

const painPoints = [
  {
    icon: "🧭",
    title: "不了解自己",
    desc: "不知道自己的性格优势在哪、适合什么行业方向",
    tag: "测评模块解决",
    tagColor: "bg-terracotta/12 text-terracotta",
  },
  {
    icon: "🔍",
    title: "看不懂 JD",
    desc: "招聘描述充斥行话黑话，不知道岗位真正要做什么",
    tag: "JD解读模块解决",
    tagColor: "bg-focus-blue/10 text-focus-blue",
  },
  {
    icon: "📊",
    title: "不知道差距",
    desc: "想投某岗位但不知道自己和岗位要求差多少",
    tag: "匹配度模块解决",
    tagColor: "bg-success-sage/12 text-success-sage",
  },
  {
    icon: "📄",
    title: "简历写不好",
    desc: "凭感觉写简历，不知道如何针对特定岗位优化",
    tag: "简历优化模块解决",
    tagColor: "bg-olive-gray/10 text-olive-gray",
  },
];

export default function HomePage() {
  const [hasData, setHasData] = useState(false);

  useEffect(() => {
    const result = storage.get(STORAGE_KEYS.ASSESSMENT_RESULT);
    setHasData(!!result);
  }, []);

  return (
    <div className="pb-20 md:pb-0">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Star field background */}
        <div className="absolute inset-0 star-field opacity-30" />
        <div className="relative max-w-7xl mx-auto px-6 md:px-12 py-16 md:py-24">
          <div>
            <p className="text-[11px] font-medium tracking-[1.2px] text-terracotta uppercase mb-5">
              AI 驱动职业探索平台
            </p>
            <h1 className="font-serif text-4xl md:text-[56px] font-medium leading-[1.1] text-near-black max-w-[780px] mb-7">
              知途
              <span className="text-terracotta">——</span>
              <br />
              为大学生点亮
              <br />
              职业方向的灯
            </h1>
            <p className="text-lg text-olive-gray max-w-[620px] leading-relaxed mb-10">
              通过科学测评认清自我，通过 JD 智能解读读懂岗位，通过精准匹配找到差距——将严肃的求职过程变成一场有趣的星图探索之旅。
            </p>
            <div className="flex gap-4">
              <Link
                href="/assessment"
                className="inline-flex items-center gap-2 px-8 py-3 bg-terracotta text-ivory rounded-xl text-sm font-medium hover:bg-coral transition-colors shadow-lg shadow-terracotta/20"
              >
                🧭 开始探索
              </Link>
              <Link
                href="/jd-decoder"
                className="inline-flex items-center gap-2 px-8 py-3 bg-ivory text-near-black rounded-xl text-sm font-medium border border-border-warm hover:border-terracotta/30 transition-colors"
              >
                🔍 解读 JD
              </Link>
            </div>
          </div>
        </div>
      </section>

      <hr className="border-border-warm mx-6 md:mx-12" />

      {/* Pain Points */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 py-16 md:py-20">
        <p className="text-[11px] font-medium tracking-[1px] text-terracotta uppercase mb-4">
          为什么需要知途？
        </p>
        <h2 className="font-serif text-3xl md:text-[40px] font-medium leading-tight text-near-black mb-4">
          大学生求职的四大痛点
        </h2>
        <p className="text-base text-olive-gray max-w-[560px] leading-relaxed mb-10">
          中国每年超过 1000 万应届毕业生，超过 60% 在入职第一年感到迷茫。问题不是努力不够，而是缺乏科学的探索工具。
        </p>

        <div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5"
        >
          {painPoints.map((point) => (
            <div
              key={point.title}
              className="bg-ivory border border-border-cream rounded-xl p-7 shadow-sm hover:shadow-md transition-shadow"
            >
              <span className="text-3xl mb-4 block">{point.icon}</span>
              <h3 className="font-serif text-xl font-medium text-near-black mb-2">
                {point.title}
              </h3>
              <p className="text-sm text-olive-gray leading-relaxed mb-4">
                {point.desc}
              </p>
              <span className={`inline-block text-[11px] font-medium px-3 py-1 rounded-full ${point.tagColor}`}>
                {point.tag}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Dashboard (shown if user has data) */}
      {hasData && (
        <section className="max-w-7xl mx-auto px-6 md:px-12 pb-16">
          <JourneyProgress />
        </section>
      )}

      {/* CTA Section */}
      <section className="bg-near-black py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-6 md:px-12 text-center">
          <div>
            <h2 className="font-serif text-3xl md:text-[40px] font-medium text-ivory mb-4">
              准备好探索你的职业星图了吗？
            </h2>
            <p className="text-warm-silver max-w-lg mx-auto mb-8">
              5 分钟测评，解锁属于你的职业方向。完全免费，无需注册。
            </p>
            <Link
              href="/assessment"
              className="inline-flex items-center gap-2 px-10 py-4 bg-terracotta text-ivory rounded-xl text-base font-medium hover:bg-coral transition-colors shadow-lg shadow-terracotta/30"
            >
              🌟 开始星图探索
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
