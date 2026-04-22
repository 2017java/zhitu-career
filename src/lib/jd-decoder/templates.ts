// ============================================================
// JD Decoder - Pre-built Job Templates
// 预置岗位解读模板，用于降级分析时快速匹配
// ============================================================

import type { JDAnalysisResult } from './types';

export interface JobTemplate {
  /** 模板名称 */
  name: string;
  /** 匹配关键词 */
  matchKeywords: string[];
  /** 权重（匹配到多少个关键词触发） */
  matchThreshold: number;
  /** 预置分析结果 */
  analysis: JDAnalysisResult;
}

export const JOB_TEMPLATES: JobTemplate[] = [
  // 1. 前端开发工程师
  {
    name: '前端开发工程师',
    matchKeywords: ['前端', 'React', 'Vue', 'JavaScript', 'TypeScript', 'HTML', 'CSS', 'Web', 'H5', '小程序', '前端开发', '前端工程师'],
    matchThreshold: 2,
    analysis: {
      summary: '这个岗位主要负责网站或 App 的界面开发，就是把设计师画的图变成真正能点能用的页面。日常工作包括写代码实现页面效果、和后端对接数据接口、优化页面加载速度等。适合对视觉细节敏感、喜欢即时看到成果的人。',
      hardSkills: [
        { name: 'HTML/CSS', required: true, shortTermLearnable: true },
        { name: 'JavaScript', required: true, shortTermLearnable: true },
        { name: 'React/Vue', required: true, shortTermLearnable: true },
        { name: 'TypeScript', required: false, shortTermLearnable: true },
        { name: '前端工程化(Webpack/Vite)', required: false, shortTermLearnable: true },
        { name: '小程序开发', required: false, shortTermLearnable: true },
      ],
      softSkills: ['沟通能力', '学习能力', '细节导向', '团队协作'],
      careerPath: {
        year1: '熟悉项目技术栈，能独立完成页面开发，参与需求评审和代码评审',
        year3: '成为团队核心成员，负责复杂模块开发，参与技术选型和架构设计',
        year5: '成长为前端技术负责人或全栈工程师，带领团队完成大型项目',
      },
      hiddenRequirements: ['可能需要一定的设计审美', '面试常考手写代码和算法题', '需要持续学习新技术'],
      fresherFriendly: 2,
    },
  },

  // 2. 后端开发工程师（Java）
  {
    name: 'Java后端开发工程师',
    matchKeywords: ['Java', 'Spring', 'Spring Boot', '微服务', '后端开发', '后端工程师', '服务端', '服务端开发'],
    matchThreshold: 2,
    analysis: {
      summary: '这个岗位负责开发网站或 App 背后的"大脑"——服务器端程序。主要工作包括设计数据库结构、编写业务逻辑代码、确保系统稳定运行。日常工作大量和数据库、接口、系统架构打交道。适合逻辑思维强、喜欢解决复杂问题的人。',
      hardSkills: [
        { name: 'Java', required: true, shortTermLearnable: false },
        { name: 'Spring Boot', required: true, shortTermLearnable: true },
        { name: 'MySQL', required: true, shortTermLearnable: true },
        { name: 'Redis', required: false, shortTermLearnable: true },
        { name: '微服务架构', required: false, shortTermLearnable: false },
        { name: '分布式系统', required: false, shortTermLearnable: false },
        { name: 'Docker/K8s', required: false, shortTermLearnable: true },
      ],
      softSkills: ['逻辑思维', '问题解决', '团队协作', '学习能力'],
      careerPath: {
        year1: '熟悉公司技术栈和业务流程，能独立完成功能模块开发',
        year3: '深入理解系统架构，能独立设计复杂功能模块，参与性能优化',
        year5: '成为后端架构师或技术负责人，主导系统架构设计和技术决策',
      },
      hiddenRequirements: ['面试通常有较难的算法题', '大厂偏好高学历', '需要理解业务逻辑，不只是写代码'],
      fresherFriendly: 2,
    },
  },

  // 3. 产品经理
  {
    name: '产品经理',
    matchKeywords: ['产品经理', 'PM', '产品策划', '需求分析', 'PRD', '用户研究', '竞品分析', '产品助理'],
    matchThreshold: 2,
    analysis: {
      summary: '产品经理是连接用户需求和技术实现的桥梁。日常工作包括调研用户需求、设计产品功能、画原型图、写需求文档、和开发团队沟通协调、跟踪项目进度。简单说就是决定"做什么"和"怎么做"。适合善于观察用户、沟通能力强、有商业思维的人。',
      hardSkills: [
        { name: 'Axure/原型设计', required: true, shortTermLearnable: true },
        { name: '需求文档编写', required: true, shortTermLearnable: true },
        { name: '数据分析', required: true, shortTermLearnable: true },
        { name: '项目管理', required: false, shortTermLearnable: false },
        { name: 'SQL', required: false, shortTermLearnable: true },
      ],
      softSkills: ['沟通能力', '逻辑思维', '用户思维', '执行力', '商业思维', '团队协作'],
      careerPath: {
        year1: '从产品助理做起，学习写需求文档、画原型，熟悉产品开发流程',
        year3: '独立负责产品线或核心功能模块，能进行数据驱动的产品决策',
        year5: '成为高级产品经理或产品总监，负责产品战略规划和团队管理',
      },
      hiddenRequirements: ['需要较强的"讲故事"能力', '经常需要协调多方利益', '加班可能较多，尤其在大厂'],
      fresherFriendly: 2,
    },
  },

  // 4. 数据分析师
  {
    name: '数据分析师',
    matchKeywords: ['数据分析', '数据分析师', 'BI', 'Tableau', 'Power BI', 'SQL', '数据可视化', '数据运营'],
    matchThreshold: 2,
    analysis: {
      summary: '数据分析师负责从海量数据中发现规律和问题，用数据支持业务决策。日常工作包括写 SQL 取数据、做报表和可视化、分析业务指标变化、写分析报告。适合对数字敏感、喜欢用数据说话、有好奇心的人。',
      hardSkills: [
        { name: 'SQL', required: true, shortTermLearnable: true },
        { name: 'Excel', required: true, shortTermLearnable: true },
        { name: 'Python', required: false, shortTermLearnable: true },
        { name: '数据可视化(Tableau/Power BI)', required: true, shortTermLearnable: true },
        { name: '统计学基础', required: true, shortTermLearnable: false },
        { name: 'A/B测试', required: false, shortTermLearnable: true },
      ],
      softSkills: ['逻辑思维', '商业思维', '沟通能力', '学习能力'],
      careerPath: {
        year1: '掌握数据提取和报表制作，熟悉业务指标体系',
        year3: '能独立完成深度分析项目，建立数据指标体系，支持业务决策',
        year5: '成为数据团队负责人或转型数据科学家/数据产品经理',
      },
      hiddenRequirements: ['需要较强的业务理解能力', '部分岗位要求统计或数学背景', '沟通能力比技术能力更重要'],
      fresherFriendly: 1,
    },
  },

  // 5. UI设计师
  {
    name: 'UI设计师',
    matchKeywords: ['UI设计', 'UI设计师', '界面设计', '视觉设计', 'Figma', 'Sketch', 'Photoshop', '平面设计'],
    matchThreshold: 2,
    analysis: {
      summary: 'UI设计师负责 App、网站等产品的视觉设计，包括界面布局、配色、图标、插画等。日常工作包括根据产品需求设计页面、制作设计规范、切图交付给开发。适合有审美能力、喜欢视觉创作、注重细节的人。',
      hardSkills: [
        { name: 'Figma/Sketch', required: true, shortTermLearnable: true },
        { name: '设计规范与组件库', required: true, shortTermLearnable: true },
        { name: '色彩理论与排版', required: true, shortTermLearnable: false },
        { name: '动效设计', required: false, shortTermLearnable: true },
        { name: '插画/C4D', required: false, shortTermLearnable: false },
      ],
      softSkills: ['审美能力', '沟通能力', '团队协作', '学习能力'],
      careerPath: {
        year1: '熟练掌握设计工具，能独立完成页面设计，建立设计规范意识',
        year3: '形成个人设计风格，负责核心产品线设计，参与设计系统建设',
        year5: '成为设计团队负责人或资深设计师，可能转型UX设计或设计管理',
      },
      hiddenRequirements: ['需要作品集', '面试通常有设计测试', '审美能力很难短期提升'],
      fresherFriendly: 2,
    },
  },

  // 6. 运营
  {
    name: '运营',
    matchKeywords: ['运营', '用户运营', '内容运营', '活动运营', '社群运营', '新媒体运营', '产品运营', '电商运营'],
    matchThreshold: 2,
    analysis: {
      summary: '运营是让产品"活起来"的角色，负责拉新用户、留住用户、让用户持续使用产品。日常工作包括策划活动、写内容、管理社群、分析数据、和用户互动。不同方向的运营侧重点不同，但核心都是围绕"用户增长"和"用户留存"。适合有创意、善于和人打交道、执行力强的人。',
      hardSkills: [
        { name: '数据分析', required: true, shortTermLearnable: true },
        { name: '内容创作/文案', required: true, shortTermLearnable: true },
        { name: '活动策划', required: false, shortTermLearnable: true },
        { name: 'Excel/SQL', required: false, shortTermLearnable: true },
        { name: 'PS/设计工具', required: false, shortTermLearnable: true },
      ],
      softSkills: ['执行力', '沟通能力', '创造力', '用户思维', '抗压能力'],
      careerPath: {
        year1: '从执行层面做起，熟悉运营工具和流程，积累用户运营经验',
        year3: '能独立策划和执行大型运营活动，对数据指标负责',
        year5: '成为运营团队负责人或转型产品经理/市场经理',
      },
      hiddenRequirements: ['KPI压力大', '需要较强的文案能力', '可能需要加班赶活动'],
      fresherFriendly: 1,
    },
  },

  // 7. 市场营销
  {
    name: '市场营销',
    matchKeywords: ['市场', '市场营销', '品牌', '公关', '广告', '投放', '品牌营销', '市场推广', '市场策划'],
    matchThreshold: 2,
    analysis: {
      summary: '市场营销负责让更多人知道和认可品牌或产品。日常工作包括制定营销策略、管理广告投放、策划品牌活动、维护媒体关系、分析市场数据。适合有商业头脑、创意丰富、善于沟通的人。',
      hardSkills: [
        { name: '市场调研', required: true, shortTermLearnable: true },
        { name: '广告投放(信息流/SEM)', required: false, shortTermLearnable: true },
        { name: '数据分析', required: true, shortTermLearnable: true },
        { name: '文案策划', required: true, shortTermLearnable: true },
        { name: '媒体关系', required: false, shortTermLearnable: false },
      ],
      softSkills: ['商业思维', '沟通能力', '创造力', '执行力', '学习能力'],
      careerPath: {
        year1: '熟悉市场推广渠道和工具，参与营销活动的执行',
        year3: '能独立制定营销方案，管理广告预算，对投放效果负责',
        year5: '成为市场总监或品牌负责人，主导品牌战略',
      },
      hiddenRequirements: ['需要一定的行业人脉', '部分岗位有应酬需求', '需要关注行业动态和竞品'],
      fresherFriendly: 2,
    },
  },

  // 8. 算法工程师
  {
    name: '算法工程师',
    matchKeywords: ['算法', '算法工程师', '机器学习', '深度学习', '推荐', 'NLP', '计算机视觉', 'AI', '人工智能'],
    matchThreshold: 2,
    analysis: {
      summary: '算法工程师是 AI 时代的热门岗位，负责设计和优化各种智能算法。日常工作包括数据处理、模型训练、算法调优、效果评估。这个岗位技术门槛较高，通常需要硕士及以上学历。适合数学基础好、对 AI 技术有热情、喜欢研究前沿技术的人。',
      hardSkills: [
        { name: 'Python', required: true, shortTermLearnable: true },
        { name: '机器学习算法', required: true, shortTermLearnable: false },
        { name: '深度学习框架(PyTorch/TF)', required: true, shortTermLearnable: true },
        { name: '数学基础(线代/概率/统计)', required: true, shortTermLearnable: false },
        { name: '论文阅读与复现', required: false, shortTermLearnable: false },
      ],
      softSkills: ['学习能力', '逻辑思维', '问题解决', '研究能力'],
      careerPath: {
        year1: '熟悉模型训练流程，能复现论文算法，参与实际项目落地',
        year3: '能独立负责算法模块的设计和优化，发表高质量论文',
        year5: '成为算法团队负责人或 AI 科学家，在细分领域有深厚积累',
      },
      hiddenRequirements: ['大厂普遍要求硕士及以上学历', '需要持续跟踪最新论文', '面试难度较大'],
      fresherFriendly: 3,
    },
  },

  // 9. 测试工程师
  {
    name: '测试工程师',
    matchKeywords: ['测试', '测试工程师', 'QA', '质量保证', '自动化测试', '性能测试', '软件测试'],
    matchThreshold: 2,
    analysis: {
      summary: '测试工程师是产品质量的"守门员"，负责找出软件中的各种问题。日常工作包括编写测试用例、手动测试功能、编写自动化测试脚本、报告和跟踪 Bug。适合细心耐心、善于发现问题、有责任感的人。',
      hardSkills: [
        { name: '测试理论与用例设计', required: true, shortTermLearnable: true },
        { name: '自动化测试(Selenium/Appium)', required: false, shortTermLearnable: true },
        { name: '性能测试(JMeter)', required: false, shortTermLearnable: true },
        { name: 'SQL', required: false, shortTermLearnable: true },
        { name: 'Linux基础', required: false, shortTermLearnable: true },
      ],
      softSkills: ['细心', '耐心', '沟通能力', '逻辑思维'],
      careerPath: {
        year1: '掌握测试流程和工具，能独立完成功能测试',
        year3: '深入自动化测试或性能测试，建立测试框架，提升测试效率',
        year5: '成为测试团队负责人或质量总监，建立质量保障体系',
      },
      hiddenRequirements: ['容易被低估，需要主动展示价值', '需要一定的编程能力才能走得更远', '部分公司测试岗位地位较低'],
      fresherFriendly: 1,
    },
  },

  // 10. 人力资源
  {
    name: '人力资源',
    matchKeywords: ['人力资源', 'HR', '招聘', '人事', 'HRBP', '人力资源专员', '招聘专员', '培训'],
    matchThreshold: 2,
    analysis: {
      summary: '人力资源负责公司的人才管理，包括招聘、培训、绩效、薪酬等模块。日常工作包括发布招聘信息、筛选简历、面试候选人、组织培训、处理员工关系等。适合善于沟通、有亲和力、组织能力强的人。',
      hardSkills: [
        { name: '招聘流程管理', required: true, shortTermLearnable: true },
        { name: '劳动法知识', required: true, shortTermLearnable: true },
        { name: '数据分析(Excel)', required: false, shortTermLearnable: true },
        { name: '培训体系设计', required: false, shortTermLearnable: false },
      ],
      softSkills: ['沟通能力', '亲和力', '组织能力', '保密意识', '学习能力'],
      careerPath: {
        year1: '熟悉招聘流程，能独立完成简历筛选和初面',
        year3: '深入某一模块（招聘/培训/绩效），成为模块专家',
        year5: '成为 HRBP 或人力资源经理，为业务部门提供全方位 HR 支持',
      },
      hiddenRequirements: ['需要较强的情商和人际处理能力', '部分岗位需要处理敏感信息', '大厂 HRBP 需要理解业务'],
      fresherFriendly: 1,
    },
  },

  // 11. Python后端开发
  {
    name: 'Python后端开发工程师',
    matchKeywords: ['Python', 'Django', 'Flask', 'FastAPI', 'Python开发', 'Python工程师'],
    matchThreshold: 2,
    analysis: {
      summary: '这个岗位使用 Python 语言开发后端服务，常见于互联网公司、AI 公司和数据平台。日常工作包括编写 API 接口、数据处理脚本、自动化工具等。Python 语法简洁，入门相对容易，适合喜欢快速开发、对 AI/数据方向感兴趣的人。',
      hardSkills: [
        { name: 'Python', required: true, shortTermLearnable: true },
        { name: 'Django/Flask/FastAPI', required: true, shortTermLearnable: true },
        { name: 'MySQL/PostgreSQL', required: true, shortTermLearnable: true },
        { name: 'Redis', required: false, shortTermLearnable: true },
        { name: 'Docker', required: false, shortTermLearnable: true },
      ],
      softSkills: ['逻辑思维', '学习能力', '问题解决', '团队协作'],
      careerPath: {
        year1: '熟练使用 Python Web 框架，能独立完成 API 开发',
        year3: '深入理解系统架构，可能涉及 AI/数据相关项目',
        year5: '成为技术负责人或转型 AI 工程师/数据工程师',
      },
      hiddenRequirements: ['Python 岗位竞争较激烈', '需要了解 Python 生态的包管理', '部分岗位要求有 AI/ML 背景'],
      fresherFriendly: 2,
    },
  },

  // 12. Go后端开发
  {
    name: 'Go后端开发工程师',
    matchKeywords: ['Go', 'Golang', 'Go开发', 'Go工程师', 'Gin'],
    matchThreshold: 2,
    analysis: {
      summary: 'Go 语言以高性能和简洁著称，广泛用于云计算、微服务、区块链等领域。这个岗位负责用 Go 开发高性能后端服务。适合追求性能优化、对系统底层感兴趣、喜欢简洁代码风格的人。',
      hardSkills: [
        { name: 'Go', required: true, shortTermLearnable: true },
        { name: '微服务架构', required: true, shortTermLearnable: false },
        { name: 'gRPC', required: false, shortTermLearnable: true },
        { name: 'MySQL/Redis', required: true, shortTermLearnable: true },
        { name: 'Docker/K8s', required: false, shortTermLearnable: true },
      ],
      softSkills: ['逻辑思维', '学习能力', '问题解决', '团队协作'],
      careerPath: {
        year1: '掌握 Go 语言特性和常用框架，能独立开发微服务',
        year3: '深入分布式系统设计，负责高并发场景优化',
        year5: '成为后端架构师，主导技术选型和系统设计',
      },
      hiddenRequirements: ['Go 岗位通常要求有后端开发经验', '需要理解并发编程', '面试常考系统设计题'],
      fresherFriendly: 3,
    },
  },
];

/**
 * 根据关键词匹配最合适的岗位模板
 * @param jdText JD 原文
 * @returns 匹配到的模板或 null
 */
export function matchTemplate(jdText: string): JobTemplate | null {
  let bestMatch: JobTemplate | null = null;
  let bestScore = 0;

  for (const template of JOB_TEMPLATES) {
    let matchCount = 0;
    for (const keyword of template.matchKeywords) {
      if (jdText.includes(keyword)) {
        matchCount++;
      }
    }
    if (matchCount >= template.matchThreshold && matchCount > bestScore) {
      bestScore = matchCount;
      bestMatch = template;
    }
  }

  return bestMatch;
}
