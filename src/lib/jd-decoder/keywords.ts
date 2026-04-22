// ============================================================
// JD Decoder - Keywords Dictionary
// 参考计划文档 8.4 节
// ============================================================

/**
 * 硬技能关键词词典
 * 按领域分类，用于从 JD 中提取技术/专业能力要求
 */
export const HARD_SKILL_KEYWORDS: Record<string, {
  keywords: string[];
  shortTermLearnable: boolean;
}> = {
  // 前端开发
  frontend: {
    keywords: [
      'HTML', 'CSS', 'JavaScript', 'TypeScript', 'React', 'Vue', 'Angular',
      'Next.js', 'Nuxt.js', 'Webpack', 'Vite', 'Sass', 'Less', 'Tailwind',
      'Bootstrap', 'Ant Design', 'Element UI', '微信小程序', 'uni-app',
      'Flutter', 'React Native', 'Node.js', 'Express', 'Koa',
      'jQuery', 'ES6', '前端', 'Web', 'H5', '响应式',
    ],
    shortTermLearnable: true,
  },
  // 后端开发
  backend: {
    keywords: [
      'Java', 'Spring', 'Spring Boot', 'Spring Cloud', 'MyBatis', 'Hibernate',
      'Python', 'Django', 'Flask', 'FastAPI', 'Go', 'Golang', 'Gin',
      'C++', 'C#', '.NET', 'PHP', 'Laravel', 'Ruby', 'Rails',
      'Rust', 'Scala', '微服务', '分布式', '高并发',
    ],
    shortTermLearnable: false,
  },
  // 数据库
  database: {
    keywords: [
      'MySQL', 'PostgreSQL', 'MongoDB', 'Redis', 'Elasticsearch',
      'Oracle', 'SQL Server', 'SQLite', 'TiDB', 'ClickHouse',
      'Neo4j', 'Cassandra', 'HBase', '数据库', 'SQL', 'NoSQL',
    ],
    shortTermLearnable: true,
  },
  // 数据科学与分析
  dataScience: {
    keywords: [
      '机器学习', '深度学习', 'NLP', '自然语言处理', '计算机视觉',
      'TensorFlow', 'PyTorch', 'scikit-learn', 'Pandas', 'NumPy',
      '数据分析', '数据挖掘', '数据建模', '特征工程', 'A/B测试',
      '统计学', '回归分析', '分类算法', '聚类分析',
      'Tableau', 'Power BI', 'FineBI', '数据可视化',
      'Hadoop', 'Spark', 'Flink', 'Hive', 'Kafka', '数据仓库',
    ],
    shortTermLearnable: false,
  },
  // 运维与 DevOps
  devops: {
    keywords: [
      'Docker', 'Kubernetes', 'K8s', 'CI/CD', 'Jenkins', 'GitLab CI',
      'Linux', 'Shell', 'Nginx', 'Tomcat', 'Ansible', 'Terraform',
      'AWS', '阿里云', '腾讯云', '华为云', '云原生', 'Serverless',
      'Prometheus', 'Grafana', 'ELK', '运维',
    ],
    shortTermLearnable: true,
  },
  // 产品与设计
  product: {
    keywords: [
      'Axure', 'Figma', 'Sketch', 'Photoshop', 'Illustrator',
      'PRD', '需求分析', '用户研究', '竞品分析', '原型设计',
      '交互设计', 'UI设计', 'UX', '用户体验', '设计规范',
      'After Effects', 'C4D', 'Blender', '动效设计',
    ],
    shortTermLearnable: true,
  },
  // 项目管理
  management: {
    keywords: [
      'PMP', 'Scrum', '敏捷开发', '项目管理', 'JIRA', 'Confluence',
      'OKR', 'KPI', '团队管理', '资源协调', '进度管理',
    ],
    shortTermLearnable: false,
  },
  // AI / 大模型
  ai: {
    keywords: [
      '大模型', 'LLM', 'GPT', 'ChatGPT', '文心一言', '通义千问',
      'Prompt Engineering', 'RAG', 'LangChain', '向量数据库',
      '知识图谱', '推荐系统', '强化学习', 'Transformer',
      'Stable Diffusion', 'Midjourney', 'AIGC',
    ],
    shortTermLearnable: false,
  },
  // 测试
  testing: {
    keywords: [
      'Selenium', 'Appium', 'JMeter', 'Postman', '自动化测试',
      '性能测试', '压力测试', '单元测试', '集成测试',
      'Jest', 'Mocha', 'Pytest', '测试用例', '质量保证',
    ],
    shortTermLearnable: true,
  },
  // 移动开发
  mobile: {
    keywords: [
      'iOS', 'Android', 'Swift', 'Objective-C', 'Kotlin',
      'SwiftUI', 'Jetpack Compose', 'React Native', 'Flutter',
      '移动端', 'App开发', '鸿蒙', 'HarmonyOS',
    ],
    shortTermLearnable: false,
  },
};

/**
 * 软技能关键词词典
 */
export const SOFT_SKILL_KEYWORDS: string[] = [
  '沟通能力', '沟通技巧', '表达能力', '口头表达', '书面表达',
  '团队协作', '团队合作', '跨部门协作', '跨团队',
  '抗压能力', '抗压', '承压', '适应能力强', '适应能力',
  '学习能力', '快速学习', '自驱', '自我驱动', '主动性',
  '责任心', '责任感', '负责', '靠谱',
  '逻辑思维', '逻辑清晰', '分析能力', '分析思维',
  '创新思维', '创新意识', '创造力',
  '项目管理', '项目管理能力', '时间管理',
  '领导力', '领导能力', '管理能力', '团队管理',
  '执行力', '执行能力', '落地能力', '结果导向',
  '问题解决', '解决问题', '问题分析',
  '细节导向', '细心', '严谨',
  '客户思维', '用户思维', '服务意识', '客户导向',
  '商业思维', '商业意识', '商业敏感度',
  '谈判能力', '谈判', '说服力',
  '演讲能力', '汇报能力', '展示能力',
  '多线程', '多任务', '并行处理',
  '英语', '英文', 'CET-6', 'CET-4', '雅思', '托福', '英语流利',
  '文档能力', '文档编写', '技术文档', '文档写作',
];

/**
 * 学历关键词
 */
export const EDUCATION_KEYWORDS = {
  patterns: [
    /(?:本科|学士|bachelor)/i,
    /(?:硕士|研究生|master)/i,
    /(?:博士|phd|doctor)/i,
    /(?:大专|专科|高职)/i,
    /985/i,
    /211/i,
    /双一流/i,
    /全日制/i,
    /统招/i,
    /海外留?学/i,
    /QS\s*\d{3}/i,
    /TOP\s*\d{2}/i,
  ],
  levels: ['大专', '本科', '硕士', '博士'],
};

/**
 * 经验要求关键词
 */
export const EXPERIENCE_KEYWORDS = {
  patterns: [
    /(\d+)\s*年(?:以上)?(?:工作)?(?:经验)?/g,
    /应届(?:毕业生)?/i,
    /在校(?:生)?/i,
    /实习(?:生)?/i,
    /不限经验/i,
    /经验不限/i,
    /无经验/i,
    /接受应届/i,
    /欢迎应届/i,
    /fresh\s*graduate/i,
    /entry\s*level/i,
  ],
  fresherIndicators: [
    '应届', '在校', '实习', '不限经验', '经验不限', '无经验',
    '接受应届', '欢迎应届', 'fresh graduate', 'entry level',
    '0-1年', '0年', '1年以内', '毕业',
  ],
};

/**
 * 隐性要求关键词
 */
export const HIDDEN_REQUIREMENT_KEYWORDS = {
  overtime: ['加班', '弹性工作', '大小周', '996', '奋斗', '拼搏', '创业精神', '能接受加班', '高强度'],
  education: ['985', '211', '双一流', 'QS', 'TOP', '名校', '重点大学', '海外'],
  language: ['英语流利', 'CET-6', '雅思', '托福', '英文工作环境', 'bilingual'],
  age: ['35岁以下', '30岁以下', '28岁以下', '年龄限制'],
  gender: ['男性优先', '女性优先', '仅限', '性别要求'],
  location: ['驻场', '出差', '外派', 'base', 'onsite'],
  stability: ['稳定性', '长期发展', '职业规划清晰'],
  industry: ['有.*行业经验', '了解.*行业', '熟悉.*行业'],
};
