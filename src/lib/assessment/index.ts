import type { ScenarioCard, AssessmentResult, HollandScores, ValueScores, SoftSkillScores, MBTIResult } from './types';
import { calculateHollandFromWeights, getCareerDirections } from './holland';
import { calculateMBTI } from './mbti';

export type AssessmentAnswers = Map<string, number>; // questionId -> optionIndex

export function processAssessment(
  questions: ScenarioCard[],
  answers: AssessmentAnswers
): Omit<AssessmentResult, 'personalityTag' | 'personalityTagEn' | 'careerDirections' | 'weaknesses' | 'tips'> {
  const hollandScores: HollandScores = { R: 0, I: 0, A: 0, S: 0, E: 0, C: 0 };
  const mbtiDims = { EI: 0, SN: 0, TF: 0, JP: 0 };
  const valueScores: ValueScores = { salary: 0, growth: 0, stability: 0, creativity: 0, impact: 0 };
  const softSkillScores: SoftSkillScores = { communication: 0, execution: 0, creativity: 0, resilience: 0, analysis: 0, leadership: 0 };

  for (const [questionId, optionIndex] of answers) {
    const question = questions.find((q) => q.id === questionId);
    if (!question) continue;

    const option = question.options[optionIndex];
    if (!option) continue;

    // Holland weights
    if (option.hollandWeights) {
      for (const [key, value] of Object.entries(option.hollandWeights)) {
        hollandScores[key as keyof HollandScores] += value;
      }
    }

    // MBTI
    if (option.mbtiDimension && option.mbtiValue !== undefined) {
      mbtiDims[option.mbtiDimension] += option.mbtiValue;
    }

    // Values
    if (option.valueCategory && option.valueScore !== undefined) {
      valueScores[option.valueCategory] += option.valueScore;
    }

    // Soft skills
    if (option.softSkill && option.softSkillScore !== undefined) {
      softSkillScores[option.softSkill] += option.softSkillScore;
    }
  }

  // Normalize soft skills to 0-100 scale
  const maxSoftSkill = Math.max(...Object.values(softSkillScores), 1);
  const normalizedSoftSkills: SoftSkillScores = {} as SoftSkillScores;
  for (const [key, value] of Object.entries(softSkillScores)) {
    normalizedSoftSkills[key as keyof SoftSkillScores] = Math.round((value / maxSoftSkill) * 100);
  }

  const holland = calculateHollandFromWeights(hollandScores);
  const mbtiResult: MBTIResult = calculateMBTI(mbtiDims);

  return {
    hollandCode: holland.code,
    hollandScores: holland.scores,
    mbtiType: mbtiResult.type,
    mbtiResult,
    valueScores,
    softSkillScores: normalizedSoftSkills,
    createdAt: new Date().toISOString(),
  };
}
