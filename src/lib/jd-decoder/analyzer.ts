// ============================================================
// JD Decoder - Analyzer Engine
// AI 优先 + 降级兜底的统一分析入口
// ============================================================

import type { JDAnalysisResult, Skill } from './types';
import { JD_DECODER_PROMPT } from '@/lib/ai/prompts';
import { chatWithAIProxy } from '@/lib/ai/client';
import {
  HARD_SKILL_KEYWORDS,
  SOFT_SKILL_KEYWORDS,
  EDUCATION_KEYWORDS,
  EXPERIENCE_KEYWORDS,
  HIDDEN_REQUIREMENT_KEYWORDS,
} from './keywords';
import { matchTemplate, JOB_TEMPLATES } from './templates';

/**
 * 正则提取学历要求
 */
export function extractEducation(jdText: string): string {
  const text = jdText.toLowerCase();

  // 按学历从高到低匹配
  if (/博士|phd/i.test(text)) return '博士';
  if (/硕士|研究生|master/i.test(text)) return '硕士';
  if (/本科|学士|bachelor/i.test(text)) return '本科';
  if (/大专|专科|高职/i.test(text)) return '大专';

  // 检查是否有特殊要求
  if (/985|211|双一流/i.test(text)) return '本科（985/211优先）';
  if (/全日制/i.test(text)) return '全日制本科';

  return '未明确';
}

/**
 * 正则提取经验要求
 */
export function extractExperience(jdText: string): string {
  const text = jdText;

  // 匹配 "X年" 模式
  const yearMatch = text.match(/(\d+)\s*[-~到至]\s*(\d+)\s*年/);
  if (yearMatch) {
    return `${yearMatch[1]}-${yearMatch[2]}年`;
  }

  const singleYearMatch = text.match(/(\d+)\s*年(?:以上)?/);
  if (singleYearMatch) {
    const years = parseInt(singleYearMatch[1], 10);
    if (years === 0) return '不限';
    if (years <= 1) return '1年以内';
    if (years <= 3) return '1-3年';
    if (years <= 5) return '3-5年';
    return `${years}年以上`;
  }

  // 检查应届生相关关键词
  for (const indicator of EXPERIENCE_KEYWORDS.fresherIndicators) {
    if (text.includes(indicator)) {
      return '应届生/经验不限';
    }
  }

  return '未明确';
}

/**
 * 关键词匹配提取硬技能
 */
export function extractHardSkills(jdText: string): Skill[] {
  const skills: Skill[] = [];
  const found = new Set<string>();

  for (const [, category] of Object.entries(HARD_SKILL_KEYWORDS)) {
    for (const keyword of category.keywords) {
      if (jdText.includes(keyword) && !found.has(keyword)) {
        found.add(keyword);
        skills.push({
          name: keyword,
          required: true,
          shortTermLearnable: category.shortTermLearnable,
        });
      }
    }
  }

  // 去重并限制数量
  return skills.slice(0, 15);
}

/**
 * 关键词匹配提取软技能
 */
export function extractSoftSkills(jdText: string): string[] {
  const found: string[] = [];

  for (const keyword of SOFT_SKILL_KEYWORDS) {
    if (jdText.includes(keyword) && !found.includes(keyword)) {
      found.push(keyword);
    }
  }

  return found.slice(0, 8);
}

/**
 * 模板匹配
 */
export function matchJobTemplate(jdText: string) {
  return matchTemplate(jdText);
}

/**
 * 计算应届友好度
 */
export function calculateFresherFriendly(jdText: string): 1 | 2 | 3 {
  let score = 2; // 默认一般

  // 应届友好信号
  const friendlySignals = [
    '应届', '在校', '实习', '不限经验', '经验不限', '无经验',
    '接受应届', '欢迎应届', 'fresh graduate', 'entry level',
    '0-1年', '0年', '1年以内', '毕业', '校招',
  ];

  // 应届不友好信号
  const unfriendlySignals = [
    '3年以上', '5年以上', '资深', '高级', '专家', '架构师',
    'team lead', '负责人', '经理', '总监', '主管',
    '独立负责', '带队', '带领团队',
  ];

  let friendlyCount = 0;
  let unfriendlyCount = 0;

  for (const signal of friendlySignals) {
    if (jdText.includes(signal)) friendlyCount++;
  }

  for (const signal of unfriendlySignals) {
    if (jdText.includes(signal)) unfriendlyCount++;
  }

  // 学历要求过高也不友好
  if (/博士|phd/i.test(jdText)) unfriendlyCount += 2;
  if (/硕士.*经验|有.*工作经验.*硕士/i.test(jdText)) unfriendlyCount += 1;

  if (friendlyCount >= 2 && unfriendlyCount === 0) {
    score = 1; // 非常友好
  } else if (unfriendlyCount >= 2) {
    score = 3; // 不太友好
  } else if (unfriendlyCount > friendlyCount) {
    score = 3;
  } else if (friendlyCount > 0) {
    score = 1;
  }

  return score as 1 | 2 | 3;
}

/**
 * 提取隐性要求
 */
function extractHiddenRequirements(jdText: string): string[] {
  const requirements: string[] = [];

  // 加班文化
  const overtimeKeywords = HIDDEN_REQUIREMENT_KEYWORDS.overtime;
  for (const kw of overtimeKeywords) {
    if (jdText.includes(kw)) {
      requirements.push('可能存在加班文化');
      break;
    }
  }

  // 学历偏好
  const eduKeywords = HIDDEN_REQUIREMENT_KEYWORDS.education;
  for (const kw of eduKeywords) {
    if (jdText.includes(kw)) {
      requirements.push('可能有学历门槛偏好');
      break;
    }
  }

  // 语言要求
  const langKeywords = HIDDEN_REQUIREMENT_KEYWORDS.language;
  for (const kw of langKeywords) {
    if (jdText.includes(kw)) {
      requirements.push('可能有英语能力要求');
      break;
    }
  }

  // 出差/驻场
  const locationKeywords = HIDDEN_REQUIREMENT_KEYWORDS.location;
  for (const kw of locationKeywords) {
    if (jdText.includes(kw)) {
      requirements.push('可能需要出差或驻场');
      break;
    }
  }

  // 行业经验
  if (/有.*行业经验|熟悉.*行业|了解.*行业/i.test(jdText)) {
    requirements.push('可能需要有相关行业背景');
  }

  // 稳定性
  if (/稳定性|长期发展|职业规划/i.test(jdText)) {
    requirements.push('可能看重求职者的稳定性');
  }

  return requirements.length > 0 ? requirements : ['暂未发现明显隐性要求'];
}

/**
 * 降级分析主函数（不依赖 AI）
 */
export function fallbackAnalyzeJD(jdText: string): JDAnalysisResult {
  // 1. 尝试匹配预置模板
  const template = matchTemplate(jdText);

  if (template) {
    // 基于模板，但用关键词匹配增强
    const hardSkills = extractHardSkills(jdText);
    const softSkills = extractSoftSkills(jdText);
    const hiddenRequirements = extractHiddenRequirements(jdText);
    const fresherFriendly = calculateFresherFriendly(jdText);

    // 如果关键词匹配到的技能比模板多，使用关键词结果
    const finalHardSkills = hardSkills.length > template.analysis.hardSkills.length
      ? hardSkills
      : template.analysis.hardSkills;

    const finalSoftSkills = softSkills.length > template.analysis.softSkills.length
      ? softSkills
      : template.analysis.softSkills;

    return {
      summary: template.analysis.summary,
      hardSkills: finalHardSkills,
      softSkills: finalSoftSkills,
      careerPath: template.analysis.careerPath,
      hiddenRequirements: hiddenRequirements.length > 1
        ? hiddenRequirements
        : template.analysis.hiddenRequirements,
      fresherFriendly,
    };
  }

  // 2. 无模板匹配，纯关键词分析
  const education = extractEducation(jdText);
  const experience = extractExperience(jdText);
  const hardSkills = extractHardSkills(jdText);
  const softSkills = extractSoftSkills(jdText);
  const hiddenRequirements = extractHiddenRequirements(jdText);
  const fresherFriendly = calculateFresherFriendly(jdText);

  // 生成通用摘要
  const summary = `这个岗位要求${education}学历${experience !== '未明确' ? '，' + experience + '工作经验' : ''}。主要需要的技能包括${hardSkills.slice(0, 3).map(s => s.name).join('、')}${hardSkills.length > 3 ? '等' : ''}。建议根据具体岗位要求进一步了解工作内容和发展前景。`;

  return {
    summary,
    hardSkills: hardSkills.length > 0 ? hardSkills : [{ name: '待分析', required: true, shortTermLearnable: false }],
    softSkills: softSkills.length > 0 ? softSkills : ['待分析'],
    careerPath: {
      year1: '熟悉业务和技术栈，积累项目经验',
      year3: '深入专业领域，成为团队核心成员',
      year5: '向技术专家或管理方向发展',
    },
    hiddenRequirements,
    fresherFriendly,
  };
}

/**
 * 统一分析入口 — AI 优先，降级兜底
 */
export async function analyzeJD(
  jdText: string
): Promise<{ data: JDAnalysisResult; mode: 'ai' | 'fallback' }> {
  // 1. 尝试 AI 分析
  try {
    const aiResponse = await chatWithAIProxy(JD_DECODER_PROMPT, jdText, 15000);

    // 尝试从 AI 响应中提取 JSON
    const jsonMatch = aiResponse.match(/```json\s*([\s\S]*?)```/) ||
                      aiResponse.match(/\{[\s\S]*\}/);

    if (jsonMatch) {
      const jsonStr = jsonMatch[1] || jsonMatch[0];
      const parsed = JSON.parse(jsonStr);

      // 验证必要字段
      if (parsed.summary && parsed.hardSkills && parsed.careerPath) {
        return {
          data: {
            summary: parsed.summary,
            hardSkills: parsed.hardSkills || [],
            softSkills: parsed.softSkills || [],
            careerPath: parsed.careerPath || { year1: '', year3: '', year5: '' },
            hiddenRequirements: parsed.hiddenRequirements || [],
            fresherFriendly: [1, 2, 3].includes(parsed.fresherFriendly)
              ? parsed.fresherFriendly
              : 2,
          },
          mode: 'ai',
        };
      }
    }
  } catch (error) {
    console.warn('AI analysis failed, falling back to keyword analysis:', error);
  }

  // 2. AI 失败，降级到关键词分析
  const fallbackResult = fallbackAnalyzeJD(jdText);
  return {
    data: fallbackResult,
    mode: 'fallback',
  };
}
