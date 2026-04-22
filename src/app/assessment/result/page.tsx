"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import { useRouter } from "next/navigation";
import { toPng } from "html-to-image";
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ResponsiveContainer,
} from "recharts";
import { storage, STORAGE_KEYS } from "@/lib/storage";
import type { AssessmentResult, HollandType, SoftSkill } from "@/lib/assessment/types";
import { MBTI_TYPE_NAMES } from "@/lib/assessment/mbti";
import { HOLLAND_CAREER_MAP } from "@/lib/assessment/holland";

// ─── Constants ───────────────────────────────────────────────────────────────

const HOLLAND_LABELS: Record<HollandType, { name: string; emoji: string; color: string }> = {
  R: { name: "实际型", emoji: "🔧", color: "#c96442" },
  I: { name: "研究型", emoji: "🔬", color: "#d97757" },
  A: { name: "艺术型", emoji: "🎨", color: "#e8956a" },
  S: { name: "社会型", emoji: "🤝", color: "#7c9a5e" },
  E: { name: "管理型", emoji: "🚀", color: "#5b8fb9" },
  C: { name: "事务型", emoji: "📋", color: "#9b8ec4" },
};

const SOFT_SKILL_LABELS: Record<SoftSkill, { name: string; emoji: string }> = {
  communication: { name: "沟通力", emoji: "💬" },
  execution: { name: "执行力", emoji: "⚡" },
  creativity: { name: "创造力", emoji: "💡" },
  resilience: { name: "抗压性", emoji: "🛡️" },
  analysis: { name: "分析力", emoji: "📊" },
  leadership: { name: "领导力", emoji: "👑" },
};

const VALUE_LABELS: Record<string, { name: string; emoji: string }> = {
  salary: { name: "薪资回报", emoji: "💰" },
  growth: { name: "成长发展", emoji: "📈" },
  stability: { name: "稳定平衡", emoji: "⚖️" },
  creativity: { name: "创意自由", emoji: "🎨" },
  impact: { name: "社会影响", emoji: "🌍" },
};

const DEFAULT_TIPS: string[] = [
  "你的职业性格组合非常独特，建议多尝试不同领域的实习和项目来验证方向。",
  "软技能可以通过刻意练习提升，选择你最想加强的 1-2 项制定 30 天行动计划。",
  "职业方向不是一成不变的，保持开放心态，每段经历都是探索的一部分。",
  "建议将你的 Holland 代码与目标岗位的 JD 进行匹配分析，发现隐藏优势。",
  "MBTI 是了解自己偏好的工具，而非限制。你可以发展非主导维度的能力。",
];

// ─── Holland Star SVG Component ─────────────────────────────────────────────

function HollandStar({ scores }: { scores: Record<HollandType, number> }) {
  const cx = 150;
  const cy = 150;
  const outerR = 120;
  const innerR = 60;
  const types: HollandType[] = ["R", "I", "A", "S", "E", "C"];

  const maxScore = Math.max(...Object.values(scores), 1);

  // Calculate hexagon vertices
  const getHexPoint = (index: number, radius: number) => {
    const angle = (Math.PI / 3) * index - Math.PI / 2;
    return {
      x: cx + radius * Math.cos(angle),
      y: cy + radius * Math.sin(angle),
    };
  };

  // Calculate score polygon
  const scorePoints = types
    .map((type, i) => {
      const ratio = scores[type] / maxScore;
      const r = innerR + (outerR - innerR) * ratio;
      const pt = getHexPoint(i, r);
      return `${pt.x},${pt.y}`;
    })
    .join(" ");

  const outerHexPoints = types
    .map((_, i) => {
      const pt = getHexPoint(i, outerR);
      return `${pt.x},${pt.y}`;
    })
    .join(" ");

  const midHexPoints = types
    .map((_, i) => {
      const pt = getHexPoint(i, (outerR + innerR) / 2);
      return `${pt.x},${pt.y}`;
    })
    .join(" ");

  const innerHexPoints = types
    .map((_, i) => {
      const pt = getHexPoint(i, innerR);
      return `${pt.x},${pt.y}`;
    })
    .join(" ");

  return (
    <svg viewBox="0 0 300 300" className="w-full h-full">
      {/* Background glow */}
      <defs>
        <radialGradient id="starGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#c96442" stopOpacity="0.08" />
          <stop offset="100%" stopColor="#c96442" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="scoreGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#c96442" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#d97757" stopOpacity="0.3" />
        </linearGradient>
      </defs>
      <circle cx={cx} cy={cy} r={outerR + 20} fill="url(#starGlow)" />

      {/* Grid hexagons */}
      <polygon points={outerHexPoints} fill="none" stroke="#e8e6dc" strokeWidth="1" />
      <polygon points={midHexPoints} fill="none" stroke="#f0eee6" strokeWidth="0.5" strokeDasharray="4,4" />
      <polygon points={innerHexPoints} fill="none" stroke="#f0eee6" strokeWidth="0.5" />

      {/* Axis lines */}
      {types.map((_, i) => {
        const pt = getHexPoint(i, outerR);
        return (
          <line
            key={i}
            x1={cx}
            y1={cy}
            x2={pt.x}
            y2={pt.y}
            stroke="#f0eee6"
            strokeWidth="0.5"
          />
        );
      })}

      {/* Score polygon */}
      <polygon
        points={scorePoints}
        fill="url(#scoreGrad)"
        stroke="#c96442"
        strokeWidth="2"
        style={{ transformOrigin: `${cx}px ${cy}px` }}
      />

      {/* Score dots */}
      {types.map((type, i) => {
        const ratio = scores[type] / maxScore;
        const r = innerR + (outerR - innerR) * ratio;
        const pt = getHexPoint(i, r);
        return (
          <circle
            key={type}
            cx={pt.x}
            cy={pt.y}
            r="5"
            fill={HOLLAND_LABELS[type].color}
            stroke="#faf9f5"
            strokeWidth="2"
          />
        );
      })}

      {/* Labels */}
      {types.map((type, i) => {
        const pt = getHexPoint(i, outerR + 22);
        const label = HOLLAND_LABELS[type];
        return (
          <g key={type}>
            <text
              x={pt.x}
              y={pt.y - 4}
              textAnchor="middle"
              dominantBaseline="middle"
              className="text-[11px] font-medium"
              fill="#4d4c48"
            >
              {label.emoji} {label.name}
            </text>
            <text
              x={pt.x}
              y={pt.y + 12}
              textAnchor="middle"
              dominantBaseline="middle"
              className="text-[9px]"
              fill="#87867f"
            >
              {scores[type]}分
            </text>
          </g>
        );
      })}

      {/* Center dot */}
      <circle cx={cx} cy={cy} r="3" fill="#c96442" opacity="0.5" />
    </svg>
  );
}

// ─── MBTI Dimension Bar ─────────────────────────────────────────────────────

function MBTIDimensionBar({
  left,
  right,
  value,
  leftActive,
}: {
  left: string;
  right: string;
  value: number;
  leftActive: boolean;
}) {
  const normalized = Math.min(Math.abs(value) / 6, 1);
  const percentage = Math.round(normalized * 100);

  return (
    <div className="flex items-center gap-3 py-2">
      <span
        className={`w-8 text-sm font-medium text-center ${
          leftActive ? "text-terracotta" : "text-stone-gray"
        }`}
      >
        {left}
      </span>
      <div className="flex-1 h-2.5 bg-border-cream rounded-full overflow-hidden relative">
        <div
          className="absolute top-0 h-full bg-terracotta/70 rounded-full transition-all duration-700"
          style={{
            width: `${percentage}%`,
            left: leftActive ? 0 : "auto",
            right: leftActive ? "auto" : 0,
          }}
        />
      </div>
      <span
        className={`w-8 text-sm font-medium text-center ${
          !leftActive ? "text-terracotta" : "text-stone-gray"
        }`}
      >
        {right}
      </span>
    </div>
  );
}

// ─── Main Result Page ───────────────────────────────────────────────────────

export default function AssessmentResultPage() {
  const router = useRouter();
  const [result, setResult] = useState<AssessmentResult | null>(null);
  const [mounted, setMounted] = useState(false);
  const [generatingCard, setGeneratingCard] = useState(false);
  const shareCardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const data = storage.get<AssessmentResult>(STORAGE_KEYS.ASSESSMENT_RESULT);
    if (data) {
      setResult(data);
    }
    setMounted(true);
  }, []);

  const tips = useMemo(() => {
    if (result?.tips && result.tips.length > 0) return result.tips;
    return DEFAULT_TIPS;
  }, [result]);

  const careerDirections = useMemo(() => {
    if (result?.careerDirections && result.careerDirections.length > 0) {
      return result.careerDirections;
    }
    // Generate from holland scores
    if (!result) return [];
    const sorted = (Object.entries(result.hollandScores) as [HollandType, number][])
      .sort(([, a], [, b]) => b - a)
      .slice(0, 3);
    return sorted.map(([type]) => {
      const career = HOLLAND_CAREER_MAP[type];
      const dir = career.directions[0];
      return {
        name: dir.name,
        jobs: dir.jobs,
        matchReason: `你的${career.name}特质突出，适合${dir.name}方向的工作`,
      };
    });
  }, [result]);

  const valueRanking = useMemo(() => {
    if (!result) return [];
    return (Object.entries(result.valueScores) as [string, number][])
      .sort(([, a], [, b]) => b - a)
      .map(([key, score]) => ({
        key,
        ...VALUE_LABELS[key],
        score,
      }));
  }, [result]);

  const radarData = useMemo(() => {
    if (!result) return [];
    return (Object.entries(result.softSkillScores) as [SoftSkill, number][]).map(
      ([key, value]) => ({
        skill: SOFT_SKILL_LABELS[key].name,
        value,
        fullMark: 100,
      })
    );
  }, [result]);

  const mbtiName = result?.mbtiType ? MBTI_TYPE_NAMES[result.mbtiType] || "" : "";

  const handleShareCard = async () => {
    if (!shareCardRef.current) return;
    setGeneratingCard(true);
    try {
      const dataUrl = await toPng(shareCardRef.current, {
        backgroundColor: "#faf9f5",
        pixelRatio: 2,
      });
      const link = document.createElement("a");
      link.download = `职业星图-${result?.mbtiType || "result"}.png`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error("Failed to generate share card:", err);
    } finally {
      setGeneratingCard(false);
    }
  };

  const handleRetake = () => {
    storage.remove(STORAGE_KEYS.ASSESSMENT_RESULT);
    router.push("/assessment");
  };

  // Loading state
  if (!mounted) {
    return (
      <div className="min-h-[calc(100vh-120px)] flex items-center justify-center">
        <div className="text-center">
          <div className="relative w-16 h-16 mx-auto mb-4">
            <div className="absolute inset-0 border-4 border-border-warm rounded-full" />
            <div className="absolute inset-0 border-4 border-transparent border-t-terracotta rounded-full animate-spin" />
          </div>
          <p className="text-sm text-stone-gray">加载测评结果...</p>
        </div>
      </div>
    );
  }

  // No result
  if (!result) {
    return (
      <div className="min-h-[calc(100vh-120px)] flex items-center justify-center px-6">
        <div className="text-center max-w-md">
          <div className="text-5xl mb-4">🔭</div>
          <h2 className="font-serif text-2xl text-near-black mb-3">还没有测评结果</h2>
          <p className="text-olive-gray mb-6">
            完成职业星图测评后，这里会展示你的专属职业分析报告。
          </p>
          <button
            onClick={() => router.push("/assessment")}
            className="px-8 py-3 bg-terracotta text-ivory rounded-xl text-sm font-medium hover:bg-coral transition-colors"
          >
            开始测评
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pb-12">
      {/* ── Hero Section ── */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#2a2520] to-[#1a1916] px-6 pt-10 pb-16">
        {/* Decorative stars */}
        <div className="absolute inset-0 star-field opacity-30" />
        <div className="absolute top-8 left-[15%] w-1.5 h-1.5 bg-terracotta rounded-full animate-twinkle" />
        <div className="absolute top-16 right-[20%] w-1 h-1 bg-coral rounded-full animate-twinkle [animation-delay:1s]" />
        <div className="absolute top-24 left-[40%] w-1 h-1 bg-warm-silver rounded-full animate-twinkle [animation-delay:2s]" />

        <div className="relative max-w-lg mx-auto text-center">
          <div>
            <p className="text-warm-silver text-xs tracking-widest uppercase mb-3">
              Your Career Constellation
            </p>
            <h1 className="font-serif text-3xl md:text-4xl font-medium text-ivory mb-2">
              你的职业星图
            </h1>
            <p className="text-warm-silver/70 text-sm mb-8">
              基于多维度测评生成的个性化职业分析
            </p>
          </div>

          {/* Holland Code Badge */}
          <div
            className="inline-flex items-center gap-2 bg-terracotta/20 border border-terracotta/30 rounded-full px-5 py-2 mb-8"
          >
            <span className="text-terracotta font-mono text-lg font-medium tracking-wider">
              {result.hollandCode}
            </span>
            <span className="text-warm-silver text-xs">Holland Code</span>
          </div>

          {/* Star Chart */}
          <div
            className="w-64 h-64 md:w-72 md:h-72 mx-auto"
          >
            <HollandStar scores={result.hollandScores} />
          </div>
        </div>
      </section>

      {/* ── MBTI Section ── */}
      <section className="px-6 -mt-6 relative z-10">
        <div
          className="max-w-lg mx-auto bg-ivory border border-border-cream rounded-2xl p-6 shadow-sm"
        >
          <div className="flex items-center justify-between mb-5">
            <h2 className="font-serif text-lg text-near-black">人格画像</h2>
            <span className="text-xs text-stone-gray">MBTI</span>
          </div>

          {/* MBTI Type Card */}
          <div className="bg-gradient-to-br from-[#2a2520] to-[#1a1916] rounded-xl p-5 mb-5 text-center">
            <div className="text-3xl font-mono font-medium text-terracotta tracking-[0.2em] mb-1">
              {result.mbtiType}
            </div>
            <div className="text-warm-silver text-sm">{mbtiName}</div>
            {result.personalityTag && (
              <div className="mt-2 inline-flex items-center gap-1.5 bg-terracotta/15 border border-terracotta/20 rounded-full px-3 py-1">
                <span className="text-terracotta text-xs font-medium">
                  {result.personalityTag}
                </span>
                {result.personalityTagEn && (
                  <span className="text-warm-silver/60 text-[10px]">
                    {result.personalityTagEn}
                  </span>
                )}
              </div>
            )}
          </div>

          {/* MBTI Dimensions */}
          <div className="space-y-1">
            <MBTIDimensionBar
              left="E"
              right="I"
              value={result.mbtiResult.dimensions.EI}
              leftActive={result.mbtiResult.dimensions.EI >= 0}
            />
            <MBTIDimensionBar
              left="S"
              right="N"
              value={result.mbtiResult.dimensions.SN}
              leftActive={result.mbtiResult.dimensions.SN >= 0}
            />
            <MBTIDimensionBar
              left="T"
              right="F"
              value={result.mbtiResult.dimensions.TF}
              leftActive={result.mbtiResult.dimensions.TF >= 0}
            />
            <MBTIDimensionBar
              left="J"
              right="P"
              value={result.mbtiResult.dimensions.JP}
              leftActive={result.mbtiResult.dimensions.JP >= 0}
            />
          </div>
        </div>
      </section>

      {/* ── Soft Skills Radar ── */}
      <section className="px-6 mt-6">
        <div
          className="max-w-lg mx-auto bg-ivory border border-border-cream rounded-2xl p-6 shadow-sm"
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-serif text-lg text-near-black">能力雷达</h2>
            <span className="text-xs text-stone-gray">Soft Skills</span>
          </div>

          <div className="w-full h-64">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={radarData} cx="50%" cy="50%" outerRadius="70%">
                <PolarGrid stroke="#e8e6dc" />
                <PolarAngleAxis
                  dataKey="skill"
                  tick={{ fill: "#5e5d59", fontSize: 11 }}
                />
                <PolarRadiusAxis
                  angle={90}
                  domain={[0, 100]}
                  tick={{ fill: "#87867f", fontSize: 9 }}
                  axisLine={false}
                />
                <Radar
                  name="能力值"
                  dataKey="value"
                  stroke="#c96442"
                  fill="#c96442"
                  fillOpacity={0.2}
                  strokeWidth={2}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>

          {/* Skill Bars */}
          <div className="mt-4 space-y-3">
            {(Object.entries(result.softSkillScores) as [SoftSkill, number][])
              .sort(([, a], [, b]) => b - a)
              .map(([key, value]) => {
                const label = SOFT_SKILL_LABELS[key];
                return (
                  <div key={key} className="flex items-center gap-3">
                    <span className="text-sm w-16 shrink-0">
                      {label.emoji} {label.name}
                    </span>
                    <div className="flex-1 h-2 bg-border-cream rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-terracotta to-coral rounded-full"
                        style={{ width: `${value}%` }}
                      />
                    </div>
                    <span className="text-xs text-stone-gray w-8 text-right">{value}</span>
                  </div>
                );
              })}
          </div>
        </div>
      </section>

      {/* ── Career Directions ── */}
      <section className="px-6 mt-6">
        <div
          className="max-w-lg mx-auto bg-ivory border border-border-cream rounded-2xl p-6 shadow-sm"
        >
          <div className="flex items-center justify-between mb-5">
            <h2 className="font-serif text-lg text-near-black">推荐职业方向</h2>
            <span className="text-xs text-stone-gray">Top 3</span>
          </div>

          <div className="space-y-4">
            {careerDirections.slice(0, 3).map((dir, idx) => (
              <div
                key={dir.name}
                className="relative pl-6"
              >
                {/* Number badge */}
                <div className="absolute left-0 top-0 w-5 h-5 rounded-full bg-terracotta/10 border border-terracotta/20 flex items-center justify-center">
                  <span className="text-[10px] font-medium text-terracotta">
                    {idx + 1}
                  </span>
                </div>

                <h3 className="text-sm font-medium text-near-black mb-1">{dir.name}</h3>
                <div className="flex flex-wrap gap-1.5 mb-2">
                  {dir.jobs.map((job) => (
                    <span
                      key={job}
                      className="inline-block px-2.5 py-0.5 bg-parchment border border-border-cream rounded-md text-xs text-charcoal-warm"
                    >
                      {job}
                    </span>
                  ))}
                </div>
                <p className="text-xs text-stone-gray leading-relaxed">{dir.matchReason}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Value Ranking ── */}
      <section className="px-6 mt-6">
        <div
          className="max-w-lg mx-auto bg-ivory border border-border-cream rounded-2xl p-6 shadow-sm"
        >
          <div className="flex items-center justify-between mb-5">
            <h2 className="font-serif text-lg text-near-black">价值观排序</h2>
            <span className="text-xs text-stone-gray">Values</span>
          </div>

          <div className="space-y-3">
            {valueRanking.map((item, idx) => (
              <div
                key={item.key}
                className="flex items-center gap-3"
              >
                <span className="text-lg w-7 text-center">{item.emoji}</span>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm text-charcoal-warm">{item.name}</span>
                    {idx === 0 && (
                      <span className="text-[10px] text-terracotta font-medium bg-terracotta/10 px-2 py-0.5 rounded-full">
                        最看重
                      </span>
                    )}
                  </div>
                  <div className="h-1.5 bg-border-cream rounded-full overflow-hidden">
                    <div
                      className="h-full bg-terracotta/50 rounded-full"
                      style={{ width: `${Math.max((item.score / (valueRanking[0]?.score || 1)) * 100, 10)}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── AI Tips ── */}
      <section className="px-6 mt-6">
        <div
          className="max-w-lg mx-auto bg-ivory border border-border-cream rounded-2xl p-6 shadow-sm"
        >
          <div className="flex items-center justify-between mb-5">
            <h2 className="font-serif text-lg text-near-black">成长建议</h2>
            <span className="text-xs text-stone-gray">AI Tips</span>
          </div>

          <div className="space-y-3">
            {tips.map((tip, idx) => (
              <div
                key={idx}
                className="flex gap-3 p-3 bg-parchment/50 rounded-xl"
              >
                <span className="text-terracotta text-sm mt-0.5 shrink-0">✦</span>
                <p className="text-sm text-charcoal-warm leading-relaxed">{tip}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Weaknesses (if available) ── */}
      {result.weaknesses && result.weaknesses.length > 0 && (
        <section className="px-6 mt-6">
          <div
            className="max-w-lg mx-auto bg-ivory border border-border-cream rounded-2xl p-6 shadow-sm"
          >
            <div className="flex items-center justify-between mb-5">
              <h2 className="font-serif text-lg text-near-black">待提升项</h2>
              <span className="text-xs text-stone-gray">Growth Areas</span>
            </div>

            <div className="space-y-4">
              {result.weaknesses.map((w, idx) => (
                <div
                  key={w.trait}
                  className="p-4 bg-parchment/50 rounded-xl"
                >
                  <h3 className="text-sm font-medium text-near-black mb-1">{w.trait}</h3>
                  <p className="text-xs text-olive-gray mb-2">{w.description}</p>
                  <div className="flex items-start gap-2">
                    <span className="text-success-sage text-xs mt-0.5 shrink-0">→</span>
                    <p className="text-xs text-charcoal-warm">{w.suggestion}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── Share Card (hidden, used for export) ── */}
      <section className="px-6 mt-6">
        <div
          className="max-w-lg mx-auto bg-ivory border border-border-cream rounded-2xl p-6 shadow-sm"
        >
          <div className="flex items-center justify-between mb-5">
            <h2 className="font-serif text-lg text-near-black">分享你的星图</h2>
          </div>

          {/* Share Card Preview */}
          <div
            ref={shareCardRef}
            className="bg-gradient-to-br from-[#2a2520] to-[#1a1916] rounded-xl p-6 text-center mb-4"
          >
            <p className="text-warm-silver/60 text-[10px] tracking-widest uppercase mb-2">
              ZhiTu Career
            </p>
            <h3 className="font-serif text-xl text-ivory mb-1">我的职业星图</h3>
            <div className="flex items-center justify-center gap-3 mb-4">
              <span className="font-mono text-2xl text-terracotta tracking-wider">
                {result.hollandCode}
              </span>
              <span className="text-warm-silver/40">|</span>
              <span className="font-mono text-lg text-coral tracking-wider">
                {result.mbtiType}
              </span>
              {mbtiName && (
                <>
                  <span className="text-warm-silver/40">|</span>
                  <span className="text-warm-silver text-sm">{mbtiName}</span>
                </>
              )}
            </div>
            <div className="flex justify-center gap-2 mb-4">
              {careerDirections.slice(0, 3).map((dir) => (
                <span
                  key={dir.name}
                  className="px-2.5 py-1 bg-white/10 border border-white/10 rounded-lg text-[11px] text-warm-silver"
                >
                  {dir.name}
                </span>
              ))}
            </div>
            <p className="text-warm-silver/40 text-[10px]">
              扫码或在知途完成你的职业星图测评
            </p>
          </div>

          <div className="flex gap-3">
            <button
              onClick={handleShareCard}
              disabled={generatingCard}
              className="flex-1 py-3 bg-terracotta text-ivory rounded-xl text-sm font-medium hover:bg-coral transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {generatingCard ? "生成中..." : "保存分享卡"}
            </button>
            <button
              onClick={handleRetake}
              className="px-6 py-3 border border-border-warm text-charcoal-warm rounded-xl text-sm font-medium hover:bg-parchment transition-colors"
            >
              重新测评
            </button>
          </div>
        </div>
      </section>

      {/* ── Footer CTA ── */}
      <section className="px-6 mt-8 mb-4">
        <div
          className="max-w-lg mx-auto text-center"
        >
          <div className="bg-gradient-to-r from-terracotta/10 to-coral/10 border border-terracotta/15 rounded-2xl p-6">
            <p className="text-2xl mb-2">📝</p>
            <h3 className="font-serif text-lg text-near-black mb-2">下一步：解读岗位 JD</h3>
            <p className="text-sm text-olive-gray mb-4 leading-relaxed">
              上传你感兴趣的职位描述，AI 将结合你的星图结果分析匹配度。
            </p>
            <button
              onClick={() => router.push("/jd-decoder")}
              className="px-8 py-3 bg-terracotta text-ivory rounded-xl text-sm font-medium hover:bg-coral transition-colors shadow-lg shadow-terracotta/20"
            >
              开始 JD 分析
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
