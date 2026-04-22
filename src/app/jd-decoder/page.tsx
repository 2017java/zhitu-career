"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useJDDecoder } from "@/hooks/useJDDecoder";
import type { JDAnalysisResult, Skill } from "@/lib/jd-decoder/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import {
  Sparkles,
  AlertTriangle,
  RotateCcw,
  Save,
  ArrowRight,
  GraduationCap,
  Briefcase,
  TrendingUp,
  Eye,
  Star,
  Loader2,
  FileText,
  Zap,
  Clock,
  Shield,
} from "lucide-react";

// ============================================================
// JDInput Component
// ============================================================
function JDInput({
  onSubmit,
  loading,
}: {
  onSubmit: (text: string) => void;
  loading: boolean;
}) {
  const [text, setText] = useState("");
  const maxLength = 5000;

  const handleSubmit = useCallback(() => {
    const trimmed = text.trim();
    if (trimmed.length < 20) return;
    onSubmit(trimmed);
  }, [text, onSubmit]);

  return (
    <div className="space-y-3">
      <div className="relative">
        <Textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="把招聘 JD 粘贴到这里...&#10;&#10;例如：&#10;岗位职责：&#10;1. 负责公司前端项目的开发和维护&#10;2. 参与产品需求评审，提供技术方案&#10;..."
          className="min-h-[200px] resize-y rounded-xl border-border-warm bg-ivory/50 p-4 text-sm leading-relaxed placeholder:text-stone-gray/60 focus-visible:border-terracotta/40 focus-visible:ring-terracotta/20"
          disabled={loading}
        />
        <div className="absolute bottom-3 right-3 flex items-center gap-2">
          <span
            className={`text-xs ${
              text.length > maxLength * 0.9
                ? "text-error-crimson"
                : "text-stone-gray"
            }`}
          >
            {text.length}/{maxLength}
          </span>
        </div>
      </div>
      <div className="flex items-center justify-between">
        <p className="text-xs text-stone-gray">
          <Sparkles className="mr-1 inline-block size-3" />
          AI 将为你翻译这份 JD 的真实含义
        </p>
        <button
          onClick={handleSubmit}
          disabled={text.trim().length < 20 || loading}
          className="gap-1.5 rounded-lg bg-terracotta px-5 text-white hover:bg-terracotta/90 cursor-pointer"
        >
          {loading ? (
            <>
              <Loader2 className="size-4 animate-spin" />
              解读中...
            </>
          ) : (
            <>
              <Sparkles className="size-4" />
              开始解读
            </>
          )}
        </button>
      </div>
    </div>
  );
}

// ============================================================
// Skeleton Loading
// ============================================================
function AnalysisSkeleton() {
  return (
    <div className="space-y-6 animate-pulse">
      {/* Summary skeleton */}
      <div className="space-y-2">
        <div className="h-5 w-24 rounded-md bg-warm-sand" />
        <div className="h-4 w-full rounded-md bg-warm-sand" />
        <div className="h-4 w-4/5 rounded-md bg-warm-sand" />
        <div className="h-4 w-3/5 rounded-md bg-warm-sand" />
      </div>

      {/* Skills skeleton */}
      <div className="space-y-2">
        <div className="h-5 w-20 rounded-md bg-warm-sand" />
        <div className="flex flex-wrap gap-2">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="h-7 w-20 rounded-full bg-warm-sand" />
          ))}
        </div>
      </div>

      {/* Career path skeleton */}
      <div className="space-y-2">
        <div className="h-5 w-28 rounded-md bg-warm-sand" />
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex gap-3">
              <div className="h-4 w-12 rounded-md bg-warm-sand" />
              <div className="h-4 flex-1 rounded-md bg-warm-sand" />
            </div>
          ))}
        </div>
      </div>

      {/* Hidden requirements skeleton */}
      <div className="space-y-2">
        <div className="h-5 w-24 rounded-md bg-warm-sand" />
        <div className="space-y-2">
          {[1, 2].map((i) => (
            <div key={i} className="h-4 w-3/4 rounded-md bg-warm-sand" />
          ))}
        </div>
      </div>
    </div>
  );
}

// ============================================================
// Fresher Friendly Badge
// ============================================================
function FresherFriendlyBadge({ level }: { level: 1 | 2 | 3 }) {
  const config = {
    1: {
      label: "非常友好",
      color: "bg-success-sage/10 text-success-sage border-success-sage/20",
      icon: Star,
    },
    2: {
      label: "一般",
      color: "bg-terracotta/10 text-terracotta border-terracotta/20",
      icon: Shield,
    },
    3: {
      label: "不太友好",
      color: "bg-error-crimson/10 text-error-crimson border-error-crimson/20",
      icon: AlertTriangle,
    },
  };

  const { label, color, icon: Icon } = config[level];

  return (
    <div className="flex items-center gap-2">
      <span className="text-sm text-olive-gray">应届友好度</span>
      <Badge variant="outline" className={`gap-1 ${color}`}>
        <Icon className="size-3" />
        {label}
      </Badge>
    </div>
  );
}

// ============================================================
// Skill Tag
// ============================================================
function SkillTag({ skill }: { skill: Skill }) {
  return (
    <Badge
      variant="outline"
      className={`gap-1 ${
        skill.required
          ? "border-terracotta/30 text-terracotta bg-terracotta/5"
          : "border-stone-gray/30 text-olive-gray bg-stone-gray/5"
      }`}
    >
      {skill.name}
      {skill.required ? (
        <span className="text-[10px] opacity-60">必须</span>
      ) : (
        <span className="text-[10px] opacity-60">加分</span>
      )}
      {skill.shortTermLearnable && (
        <Zap className="size-3 text-success-sage" />
      )}
    </Badge>
  );
}

// ============================================================
// Career Timeline
// ============================================================
function CareerTimeline({ careerPath }: { careerPath: JDAnalysisResult["careerPath"] }) {
  const milestones = [
    { year: "第1年", desc: careerPath.year1, icon: Briefcase },
    { year: "第3年", desc: careerPath.year3, icon: TrendingUp },
    { year: "第5年", desc: careerPath.year5, icon: GraduationCap },
  ];

  return (
    <div className="relative space-y-4 pl-6">
      {/* Timeline line */}
      <div className="absolute left-[9px] top-2 bottom-2 w-px bg-gradient-to-b from-terracotta/40 via-coral/30 to-stone-gray/20" />

      {milestones.map((item, index) => (
        <div key={index} className="relative flex gap-3">
          {/* Timeline dot */}
          <div
            className={`absolute -left-6 top-0.5 flex size-[18px] items-center justify-center rounded-full border-2 ${
              index === 0
                ? "border-terracotta bg-terracotta/10"
                : index === 1
                ? "border-coral bg-coral/10"
                : "border-stone-gray bg-stone-gray/10"
            }`}
          >
            <item.icon
              className={`size-3 ${
                index === 0
                  ? "text-terracotta"
                  : index === 1
                  ? "text-coral"
                  : "text-stone-gray"
              }`}
            />
          </div>
          <div className="flex-1">
            <span
              className={`text-xs font-medium ${
                index === 0
                  ? "text-terracotta"
                  : index === 1
                  ? "text-coral"
                  : "text-stone-gray"
              }`}
            >
              {item.year}
            </span>
            <p className="mt-0.5 text-sm text-charcoal-warm leading-relaxed">
              {item.desc}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

// ============================================================
// AnalysisResult Component
// ============================================================
function AnalysisResult({
  result,
  mode,
  onReset,
  onSave,
}: {
  result: JDAnalysisResult;
  mode: "ai" | "fallback";
  onReset: () => void;
  onSave: () => void;
}) {
  return (
    <div className="space-y-6">
      {/* Mode indicator */}
      {mode === "fallback" && (
        <div className="flex items-center gap-2 rounded-lg bg-terracotta/5 border border-terracotta/10 px-3 py-2 text-sm text-terracotta">
          <AlertTriangle className="size-4 shrink-0" />
          <span>
            AI 服务暂时不可用，以下为关键词分析结果。分析精度可能略有降低。
          </span>
        </div>
      )}

      {/* Summary */}
      <Card size="sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="size-4 text-terracotta" />
            白话概括
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm leading-relaxed text-charcoal-warm">
            {result.summary}
          </p>
        </CardContent>
      </Card>

      {/* Hard Skills */}
      <Card size="sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="size-4 text-terracotta" />
            硬技能拆解
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {result.hardSkills.map((skill, index) => (
              <SkillTag key={index} skill={skill} />
            ))}
          </div>
          <div className="mt-3 flex items-center gap-4 text-xs text-stone-gray">
            <span className="flex items-center gap-1">
              <span className="inline-block size-2 rounded-full border border-terracotta/40 bg-terracotta/10" />
              必须
            </span>
            <span className="flex items-center gap-1">
              <span className="inline-block size-2 rounded-full border border-stone-gray/40 bg-stone-gray/10" />
              加分项
            </span>
            <span className="flex items-center gap-1">
              <Zap className="size-3 text-success-sage" />
              可速成
            </span>
          </div>
        </CardContent>
      </Card>

      {/* Soft Skills */}
      {result.softSkills.length > 0 && (
        <Card size="sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Star className="size-4 text-coral" />
              软技能要求
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {result.softSkills.map((skill, index) => (
                <Badge
                  key={index}
                  variant="secondary"
                  className="bg-coral/5 text-coral border-coral/10"
                >
                  {skill}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Career Path */}
      <Card size="sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="size-4 text-terracotta" />
            职业发展路径
          </CardTitle>
        </CardHeader>
        <CardContent>
          <CareerTimeline careerPath={result.careerPath} />
        </CardContent>
      </Card>

      {/* Hidden Requirements */}
      {result.hiddenRequirements.length > 0 && (
        <Card size="sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Eye className="size-4 text-olive-gray" />
              隐性要求
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {result.hiddenRequirements.map((req, index) => (
                <li
                  key={index}
                  className="flex items-start gap-2 text-sm text-charcoal-warm"
                >
                  <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-olive-gray/40" />
                  {req}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}

      {/* Fresher Friendly */}
      <Card size="sm">
        <CardContent className="pt-4">
          <FresherFriendlyBadge level={result.fresherFriendly} />
        </CardContent>
      </Card>

      {/* Actions */}
      <div className="flex items-center justify-between pt-2">
        <button onClick={onReset} className="gap-1.5 text-stone-gray cursor-pointer hover:bg-muted rounded-lg px-3 py-2 text-sm">
          <RotateCcw className="size-4" />
          重新解读
        </button>
        <button 
          onClick={onSave}
          className="gap-1.5 bg-terracotta text-white hover:bg-terracotta/90 cursor-pointer px-4 py-2 rounded-lg text-sm font-medium inline-flex items-center"
        >
          <Save className="size-4" />
          保存并继续匹配
          <ArrowRight className="size-4" />
        </button>
      </div>
    </div>
  );
}

// ============================================================
// JD Decoder Page
// ============================================================
export default function JDDecoderPage() {
  const router = useRouter();
  const { result, loading, error, mode, analyze, reset } = useJDDecoder();

  const handleSave = useCallback(() => {
    // 导航到匹配分析页面
    router.push("/match");
  }, [router]);

  return (
    <div className="min-h-screen bg-parchment">
      {/* Header */}
      <div className="border-b border-border-cream bg-ivory/60">
        <div className="mx-auto max-w-2xl px-4 py-8">
          <div className="flex items-center gap-2 text-xs text-stone-gray mb-3">
            <Clock className="size-3" />
            预计 3-5 秒完成分析
          </div>
          <h1 className="font-serif text-2xl font-bold text-near-black">
            JD 解读器
          </h1>
          <p className="mt-1 text-sm text-olive-gray">
            粘贴一份招聘 JD，AI 帮你翻译成大学生能听懂的人话
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="mx-auto max-w-2xl px-4 py-6 pb-24">
        {!result && !loading && (
          <JDInput onSubmit={analyze} loading={loading} />
        )}

        {loading && (
          <div className="space-y-6">
            <div className="flex items-center gap-2 text-sm text-terracotta">
              <Loader2 className="size-4 animate-spin" />
              正在解读这份 JD...
            </div>
            <AnalysisSkeleton />
          </div>
        )}

        {error && (
          <Card className="border-error-crimson/20 bg-error-crimson/5">
            <CardContent className="pt-4">
              <div className="flex items-start gap-3">
                <AlertTriangle className="mt-0.5 size-5 shrink-0 text-error-crimson" />
                <div>
                  <p className="text-sm font-medium text-error-crimson">
                    解读失败
                  </p>
                  <p className="mt-1 text-sm text-charcoal-warm">{error}</p>
                  <button
                    onClick={reset}
                    className="mt-3 gap-1.5 cursor-pointer border border-border-warm bg-ivory rounded-lg px-3 py-2 text-sm hover:bg-parchment"
                  >
                    <RotateCcw className="size-4" />
                    重试
                  </button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {result && !loading && (
          <AnalysisResult result={result} mode={mode} onReset={reset} onSave={handleSave} />
        )}
      </div>
    </div>
  );
}
