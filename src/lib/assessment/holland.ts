import type { HollandType, HollandScores } from './types';

// Holland RIASEC 职业方向映射
export const HOLLAND_CAREER_MAP: Record<HollandType, {
  name: string;
  directions: Array<{ name: string; jobs: string[] }>;
}> = {
  R: {
    name: '实际型',
    directions: [
      { name: '工程技术', jobs: ['机械工程师', '电气工程师', '土木工程师'] },
      { name: '技术研发', jobs: ['研发工程师', '测试工程师', '技术支持'] },
      { name: '生产运营', jobs: ['生产管理', '质量工程师', '供应链专员'] },
    ],
  },
  I: {
    name: '研究型',
    directions: [
      { name: '数据科学', jobs: ['数据分析师', '算法工程师', '数据科学家'] },
      { name: '学术研究', jobs: ['研究员', '博士后', '高校教师'] },
      { name: '产品策略', jobs: ['产品经理', '商业分析师', '市场研究员'] },
    ],
  },
  A: {
    name: '艺术型',
    directions: [
      { name: '设计创意', jobs: ['UI设计师', '平面设计师', '品牌设计师'] },
      { name: '内容创作', jobs: ['内容运营', '文案策划', '视频编导'] },
      { name: '新媒体', jobs: ['新媒体运营', '社交媒体经理', '创意总监'] },
    ],
  },
  S: {
    name: '社会型',
    directions: [
      { name: '教育培训', jobs: ['教师', '培训师', '教育产品经理'] },
      { name: '人力资源', jobs: ['HR专员', '招聘经理', '组织发展'] },
      { name: '咨询顾问', jobs: ['管理咨询', '心理咨询', '职业规划师'] },
    ],
  },
  E: {
    name: '管理型',
    directions: [
      { name: '企业管理', jobs: ['管培生', '项目经理', '部门经理'] },
      { name: '销售市场', jobs: ['销售经理', '市场总监', '商务拓展'] },
      { name: '创业方向', jobs: ['产品负责人', '业务合伙人', '创业者'] },
    ],
  },
  C: {
    name: '事务型',
    directions: [
      { name: '财务会计', jobs: ['会计', '审计师', '财务分析师'] },
      { name: '行政管理', jobs: ['行政专员', '办公室经理', '运营支持'] },
      { name: '合规风控', jobs: ['风控专员', '合规经理', '法务助理'] },
    ],
  },
};

export function calculateHollandScores(answers: Map<string, number>): HollandScores {
  const scores: HollandScores = { R: 0, I: 0, A: 0, S: 0, E: 0, C: 0 };

  // answers is a map of questionId -> selectedOptionIndex
  // This function should be called with the actual weights from each answer
  return scores;
}

export function calculateHollandFromWeights(weightedScores: HollandScores): {
  code: string;
  scores: HollandScores;
  top3: HollandType[];
} {
  const sorted = Object.entries(weightedScores)
    .sort(([, a], [, b]) => b - a) as [HollandType, number][];

  const top3 = sorted.slice(0, 3).map(([type]) => type);
  const code = top3.join('');

  return {
    code,
    scores: weightedScores,
    top3,
  };
}

export function getCareerDirections(top3: HollandType[]): Array<{
  name: string;
  jobs: string[];
  matchReason: string;
}> {
  const directions: Array<{ name: string; jobs: string[]; type: HollandType }> = [];

  for (const type of top3) {
    const career = HOLLAND_CAREER_MAP[type];
    if (career && career.directions.length > 0) {
      // Pick the first direction for each type
      const dir = career.directions[0];
      directions.push({ ...dir, type });
    }
  }

  return directions.map((d) => ({
    name: d.name,
    jobs: d.jobs,
    matchReason: `你的${HOLLAND_CAREER_MAP[d.type].name}特质突出，适合${d.name}方向的工作`,
  }));
}
