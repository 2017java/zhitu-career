export type HollandType = 'R' | 'I' | 'A' | 'S' | 'E' | 'C';

export type HollandScores = Record<HollandType, number>;

export type MBTIDimension = 'EI' | 'SN' | 'TF' | 'JP';

export type MBTIResult = {
  type: string; // e.g. "INTJ"
  dimensions: {
    EI: number; // negative = I, positive = E
    SN: number; // negative = N, positive = S
    TF: number; // negative = F, positive = T
    JP: number; // negative = P, positive = J
  };
};

export type ValueCategory = 'salary' | 'growth' | 'stability' | 'creativity' | 'impact';

export type ValueScores = Record<ValueCategory, number>;

export type SoftSkill = 'communication' | 'execution' | 'creativity' | 'resilience' | 'analysis' | 'leadership';

export type SoftSkillScores = Record<SoftSkill, number>;

export interface ScenarioCard {
  id: string;
  type: 'holland' | 'mbti' | 'value' | 'softskill';
  scene: string;
  scenario: string;
  emoji: string;
  options: {
    text: string;
    hollandWeights?: Partial<Record<HollandType, number>>;
    mbtiDimension?: MBTIDimension;
    mbtiValue?: number; // positive or negative
    valueCategory?: ValueCategory;
    valueScore?: number;
    softSkill?: SoftSkill;
    softSkillScore?: number;
  }[];
}

export interface AssessmentResult {
  hollandCode: string; // e.g. "IRC"
  hollandScores: HollandScores;
  mbtiType: string;
  mbtiResult: MBTIResult;
  valueScores: ValueScores;
  softSkillScores: SoftSkillScores;
  personalityTag?: string;
  personalityTagEn?: string;
  careerDirections?: Array<{
    name: string;
    jobs: string[];
    matchReason: string;
  }>;
  weaknesses?: Array<{
    trait: string;
    description: string;
    suggestion: string;
  }>;
  tips?: string[];
  createdAt: string;
}
