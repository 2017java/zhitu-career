import type { ScenarioCard } from './types';

export const questions: ScenarioCard[] = [
  // ============================================================
  // Holland RIASEC — 24 题 (每维度 4 题)
  // ============================================================

  // --- R 实际型 (4题) ---
  {
    id: 'h-r-1',
    type: 'holland',
    scene: '周末的工坊',
    scenario: '周末到了，你发现家里有一把椅子腿松了。你会怎么做？',
    emoji: '🔧',
    options: [
      {
        text: '翻出工具箱，自己动手修好它，顺便把其他家具也检查一遍',
        hollandWeights: { R: 3 },
      },
      {
        text: '上网搜索椅子结构原理，研究一下为什么会松动',
        hollandWeights: { R: 1, I: 2 },
      },
      {
        text: '觉得修椅子太无聊，不如重新设计一把更有创意的椅子',
        hollandWeights: { R: 1, A: 2 },
      },
    ],
  },
  {
    id: 'h-r-2',
    type: 'holland',
    scene: '公司团建',
    scenario: '公司团建安排了户外拓展活动，你更期待哪个环节？',
    emoji: '🏕️',
    options: [
      {
        text: '攀岩、定向越野这类需要动手操作和体能挑战的项目',
        hollandWeights: { R: 3 },
      },
      {
        text: '团队策略游戏，需要分析地图和制定路线',
        hollandWeights: { R: 1, I: 2 },
      },
      {
        text: '篝火晚会表演节目，展现自己的才艺',
        hollandWeights: { R: 1, A: 2 },
      },
    ],
  },
  {
    id: 'h-r-3',
    type: 'holland',
    scene: '新项目启动',
    scenario: '领导让你负责一个新项目，你最想了解的第一件事是什么？',
    emoji: '📋',
    options: [
      {
        text: '项目需要用到什么工具、技术栈和具体的交付物是什么',
        hollandWeights: { R: 3 },
      },
      {
        text: '项目的背景、目标和背后的商业逻辑',
        hollandWeights: { R: 1, I: 2 },
      },
      {
        text: '团队成员有哪些，大家怎么分工协作',
        hollandWeights: { R: 1, S: 2 },
      },
    ],
  },
  {
    id: 'h-r-4',
    type: 'holland',
    scene: '手机坏了',
    scenario: '你的手机屏幕摔碎了，你会怎么处理？',
    emoji: '📱',
    options: [
      {
        text: '自己买配件和工具，跟着教程视频换屏幕',
        hollandWeights: { R: 3 },
      },
      {
        text: '去售后维修点，顺便了解手机内部构造',
        hollandWeights: { R: 2, I: 1 },
      },
      {
        text: '直接买新手机，旧手机当备用机或者拆零件玩',
        hollandWeights: { R: 2, C: 1 },
      },
    ],
  },

  // --- I 研究型 (4题) ---
  {
    id: 'h-i-1',
    type: 'holland',
    scene: '深夜的实验室',
    scenario: '你在做一个数据分析项目，发现了一个异常数据点。你的第一反应是？',
    emoji: '🔬',
    options: [
      {
        text: '兴奋！立刻深入调查这个异常点，可能藏着重大发现',
        hollandWeights: { I: 3 },
      },
      {
        text: '先记录下来，继续完成当前的分析任务',
        hollandWeights: { I: 1, C: 2 },
      },
      {
        text: '马上截图分享给同事，一起讨论这个有趣的现象',
        hollandWeights: { I: 1, S: 2 },
      },
    ],
  },
  {
    id: 'h-i-2',
    type: 'holland',
    scene: '图书馆的午后',
    scenario: '你在书店闲逛，最吸引你的是哪个区域？',
    emoji: '📚',
    options: [
      {
        text: '科普和学术类书籍，特别是前沿科技和宇宙探索',
        hollandWeights: { I: 3 },
      },
      {
        text: '心理学和哲学类书籍，探索人类思维的奥秘',
        hollandWeights: { I: 2, S: 1 },
      },
      {
        text: '商业和管理类书籍，学习成功人士的经验',
        hollandWeights: { I: 1, E: 2 },
      },
    ],
  },
  {
    id: 'h-i-3',
    type: 'holland',
    scene: '课堂提问',
    scenario: '在一场行业分享会上，演讲者提出了一个有争议的观点。你会？',
    emoji: '🤔',
    options: [
      {
        text: '当场举手提问，用数据和逻辑指出问题所在',
        hollandWeights: { I: 3 },
      },
      {
        text: '先记下来，会后自己查资料验证',
        hollandWeights: { I: 2, C: 1 },
      },
      {
        text: '和旁边的人小声讨论，听听不同角度的看法',
        hollandWeights: { I: 1, S: 2 },
      },
    ],
  },
  {
    id: 'h-i-4',
    type: 'holland',
    scene: '假期规划',
    scenario: '长假来临，你最想怎么度过？',
    emoji: '🗺️',
    options: [
      {
        text: '去一个完全陌生的地方，深度体验当地文化和历史',
        hollandWeights: { I: 3 },
      },
      {
        text: '参加一个专业培训或学术会议，提升自己的知识储备',
        hollandWeights: { I: 2, C: 1 },
      },
      {
        text: '约朋友一起自驾游，边走边探索',
        hollandWeights: { I: 1, S: 2 },
      },
    ],
  },

  // --- A 艺术型 (4题) ---
  {
    id: 'h-a-1',
    type: 'holland',
    scene: '空白的画布',
    scenario: '公司要设计一张宣传海报，领导让你来主导。你会？',
    emoji: '🎨',
    options: [
      {
        text: '太棒了！先画几张草图，用色彩和排版讲一个视觉故事',
        hollandWeights: { A: 3 },
      },
      {
        text: '先调研目标受众的审美偏好，再决定设计方向',
        hollandWeights: { A: 2, I: 1 },
      },
      {
        text: '找几个参考案例，快速出方案给领导确认',
        hollandWeights: { A: 1, E: 2 },
      },
    ],
  },
  {
    id: 'h-a-2',
    type: 'holland',
    scene: '午休时间',
    scenario: '午休时间你会做什么来放松自己？',
    emoji: '🎵',
    options: [
      {
        text: '画画、写东西或者弹吉他，做点有创意的事',
        hollandWeights: { A: 3 },
      },
      {
        text: '刷短视频或看综艺，让大脑完全放空',
        hollandWeights: { A: 1, S: 1 },
      },
      {
        text: '整理一下工作笔记，规划下午的待办事项',
        hollandWeights: { A: 1, C: 2 },
      },
    ],
  },
  {
    id: 'h-a-3',
    type: 'holland',
    scene: '朋友圈文案',
    scenario: '你拍了一张特别好看的日落照片，准备发朋友圈。你会？',
    emoji: '🌅',
    options: [
      {
        text: '精心写一段有诗意的文案，配上合适的滤镜和排版',
        hollandWeights: { A: 3 },
      },
      {
        text: '简单写几个字，让照片自己说话',
        hollandWeights: { A: 2, I: 1 },
      },
      {
        text: '不发了，自己欣赏就好',
        hollandWeights: { A: 1, I: 1 },
      },
    ],
  },
  {
    id: 'h-a-4',
    type: 'holland',
    scene: '办公室改造',
    scenario: '公司让你负责改造办公环境，你的第一想法是？',
    emoji: '🪴',
    options: [
      {
        text: '打造一个有设计感的空间，加入绿植、艺术画和舒适座椅',
        hollandWeights: { A: 3 },
      },
      {
        text: '先调研同事们的需求，再设计一个大家满意的方案',
        hollandWeights: { A: 1, S: 2 },
      },
      {
        text: '控制预算，选择性价比最高的方案',
        hollandWeights: { A: 1, C: 2 },
      },
    ],
  },

  // --- S 社会型 (4题) ---
  {
    id: 'h-s-1',
    type: 'holland',
    scene: '新同事入职',
    scenario: '部门来了一个新同事，看起来有点拘谨。你会？',
    emoji: '👋',
    options: [
      {
        text: '主动走过去打招呼，带他熟悉环境和介绍同事',
        hollandWeights: { S: 3 },
      },
      {
        text: '等他自己适应，毕竟每个人都需要自己的节奏',
        hollandWeights: { S: 1, I: 1 },
      },
      {
        text: '给他发一份部门文档，里面有所有需要了解的信息',
        hollandWeights: { S: 1, C: 2 },
      },
    ],
  },
  {
    id: 'h-s-2',
    type: 'holland',
    scene: '朋友倾诉',
    scenario: '一个好朋友深夜给你发消息说最近工作压力很大。你会？',
    emoji: '💬',
    options: [
      {
        text: '立刻打电话过去，耐心听他倾诉，给他情感上的支持',
        hollandWeights: { S: 3 },
      },
      {
        text: '帮他分析问题出在哪里，给出具体的解决方案',
        hollandWeights: { S: 1, I: 2 },
      },
      {
        text: '约他出来吃顿好的，用行动表示关心',
        hollandWeights: { S: 2, E: 1 },
      },
    ],
  },
  {
    id: 'h-s-3',
    type: 'holland',
    scene: '志愿服务',
    scenario: '公司组织公益活动，你可以选择参与方式。你更想？',
    emoji: '🤝',
    options: [
      {
        text: '去社区教小朋友读书或辅导功课',
        hollandWeights: { S: 3 },
      },
      {
        text: '参与策划和组织活动，让更多人参与进来',
        hollandWeights: { S: 2, E: 1 },
      },
      {
        text: '做后勤保障工作，确保活动顺利进行',
        hollandWeights: { S: 1, C: 2 },
      },
    ],
  },
  {
    id: 'h-s-4',
    type: 'holland',
    scene: '团队冲突',
    scenario: '团队里两个同事因为工作分工产生了矛盾。你会？',
    emoji: '⚖️',
    options: [
      {
        text: '主动做中间人，分别找他们聊，找到双方都能接受的方案',
        hollandWeights: { S: 3 },
      },
      {
        text: '根据事实和数据，客观判断谁对谁错',
        hollandWeights: { S: 1, I: 2 },
      },
      {
        text: '这不是我的事，做好自己的工作就行',
        hollandWeights: { S: 0, C: 1 },
      },
    ],
  },

  // --- E 管理型 (4题) ---
  {
    id: 'h-e-1',
    type: 'holland',
    scene: '创业路演',
    scenario: '如果你有机会做一个创业项目，你最想扮演什么角色？',
    emoji: '🚀',
    options: [
      {
        text: 'CEO，负责整体战略规划和资源整合',
        hollandWeights: { E: 3 },
      },
      {
        text: 'CTO，负责技术架构和产品研发',
        hollandWeights: { E: 1, I: 2 },
      },
      {
        text: 'CMO，负责品牌推广和市场拓展',
        hollandWeights: { E: 2, A: 1 },
      },
    ],
  },
  {
    id: 'h-e-2',
    type: 'holland',
    scene: '年终述职',
    scenario: '年终述职时，你最想展示的是什么？',
    emoji: '🏆',
    options: [
      {
        text: '带领团队拿下的业绩和达成的商业目标',
        hollandWeights: { E: 3 },
      },
      {
        text: '个人在专业领域的技术突破和创新',
        hollandWeights: { E: 1, I: 2 },
      },
      {
        text: '帮助同事成长和团队建设的成果',
        hollandWeights: { E: 1, S: 2 },
      },
    ],
  },
  {
    id: 'h-e-3',
    type: 'holland',
    scene: '谈判桌上',
    scenario: '你代表公司和一个重要客户谈判。你的策略是？',
    emoji: '💼',
    options: [
      {
        text: '充分准备，用数据和案例说服对方，争取最大利益',
        hollandWeights: { E: 3 },
      },
      {
        text: '先了解对方的需求和痛点，再提出双赢方案',
        hollandWeights: { E: 2, S: 1 },
      },
      {
        text: '严格按照合同条款和公司政策来谈，不卑不亢',
        hollandWeights: { E: 1, C: 2 },
      },
    ],
  },
  {
    id: 'h-e-4',
    type: 'holland',
    scene: '部门聚餐',
    scenario: '部门聚餐，大家让你来选餐厅。你会？',
    emoji: '🍽️',
    options: [
      {
        text: '直接定一个大家都觉得不错的地方，快速做决定',
        hollandWeights: { E: 3 },
      },
      {
        text: '发个投票让大家选，少数服从多数',
        hollandWeights: { E: 1, S: 2 },
      },
      {
        text: '选一个自己一直想去的新餐厅，顺便带大家尝鲜',
        hollandWeights: { E: 2, A: 1 },
      },
    ],
  },

  // --- C 事务型 (4题) ---
  {
    id: 'h-c-1',
    type: 'holland',
    scene: '文件整理',
    scenario: '你的电脑桌面堆满了文件，你决定整理一下。你会？',
    emoji: '📁',
    options: [
      {
        text: '按项目-日期-类型建立清晰的文件夹层级结构',
        hollandWeights: { C: 3 },
      },
      {
        text: '只整理最近在用的，其他的先不管',
        hollandWeights: { C: 1, R: 1 },
      },
      {
        text: '删掉大部分，只保留真正重要的',
        hollandWeights: { C: 1, E: 1 },
      },
    ],
  },
  {
    id: 'h-c-2',
    type: 'holland',
    scene: '项目复盘',
    scenario: '项目结束后，领导让你写一份复盘报告。你会？',
    emoji: '📝',
    options: [
      {
        text: '按照标准模板，系统梳理项目过程、问题和改进建议',
        hollandWeights: { C: 3 },
      },
      {
        text: '重点写项目中遇到的挑战和自己的成长收获',
        hollandWeights: { C: 1, I: 2 },
      },
      {
        text: '简洁写几条关键结论，附上数据支撑',
        hollandWeights: { C: 2, E: 1 },
      },
    ],
  },
  {
    id: 'h-c-3',
    type: 'holland',
    scene: '报销流程',
    scenario: '你需要报销一笔差旅费，发现流程有点复杂。你会？',
    emoji: '🧾',
    options: [
      {
        text: '仔细阅读报销指南，把每一步都做到位，一次通过',
        hollandWeights: { C: 3 },
      },
      {
        text: '找同事请教一下之前是怎么报销的',
        hollandWeights: { C: 1, S: 2 },
      },
      {
        text: '觉得流程太繁琐，向行政建议简化',
        hollandWeights: { C: 1, E: 2 },
      },
    ],
  },
  {
    id: 'h-c-4',
    type: 'holland',
    scene: '日程管理',
    scenario: '你通常怎么管理自己的日程？',
    emoji: '📅',
    options: [
      {
        text: '用日历工具精确安排每一天，设置提醒，绝不遗漏',
        hollandWeights: { C: 3 },
      },
      {
        text: '心里有个大致计划，灵活调整',
        hollandWeights: { C: 1, A: 1 },
      },
      {
        text: '靠记忆和便签，走到哪算哪',
        hollandWeights: { C: 0, R: 1 },
      },
    ],
  },

  // ============================================================
  // MBTI — 8 题 (每维度 2 题)
  // ============================================================

  // --- E/I 维度 (2题) ---
  {
    id: 'm-ei-1',
    type: 'mbti',
    scene: '周一早会',
    scenario: '周一早上开会，领导说这周有个紧急项目需要加班。你的反应是？',
    emoji: '⚡',
    options: [
      {
        text: '当场和同事讨论分工，越快开始越好，大家一起更有干劲',
        mbtiDimension: 'EI',
        mbtiValue: 2,
      },
      {
        text: '先回工位独自想想怎么规划，理清思路再行动',
        mbtiDimension: 'EI',
        mbtiValue: -2,
      },
      {
        text: '先了解清楚项目需求和截止时间，再决定怎么安排',
        mbtiDimension: 'EI',
        mbtiValue: -1,
      },
    ],
  },
  {
    id: 'm-ei-2',
    type: 'mbti',
    scene: '周末社交',
    scenario: '周五下班后，朋友邀请你参加一个聚会。你会？',
    emoji: '🎉',
    options: [
      {
        text: '太好了！马上答应，还能认识新朋友',
        mbtiDimension: 'EI',
        mbtiValue: 2,
      },
      {
        text: '婉拒了，周末想一个人在家看书追剧充电',
        mbtiDimension: 'EI',
        mbtiValue: -2,
      },
      {
        text: '看心情吧，如果不太累就去',
        mbtiDimension: 'EI',
        mbtiValue: -1,
      },
    ],
  },

  // --- S/N 维度 (2题) ---
  {
    id: 'm-sn-1',
    type: 'mbti',
    scene: '产品讨论',
    scenario: '团队在讨论一个新功能的设计方案。你更关注？',
    emoji: '💡',
    options: [
      {
        text: '这个功能具体怎么实现，技术方案是否可行',
        mbtiDimension: 'SN',
        mbtiValue: 2,
      },
      {
        text: '这个功能背后的愿景是什么，未来能发展成什么样',
        mbtiDimension: 'SN',
        mbtiValue: -2,
      },
      {
        text: '用户实际使用场景是什么，能解决什么具体问题',
        mbtiDimension: 'SN',
        mbtiValue: 1,
      },
    ],
  },
  {
    id: 'm-sn-2',
    type: 'mbti',
    scene: '学习新技能',
    scenario: '你想学一项新技能，你会怎么开始？',
    emoji: '📖',
    options: [
      {
        text: '找一本实操教程，跟着步骤一步步做，边做边学',
        mbtiDimension: 'SN',
        mbtiValue: 2,
      },
      {
        text: '先了解整体框架和底层原理，建立全局认知',
        mbtiDimension: 'SN',
        mbtiValue: -2,
      },
      {
        text: '找一个做过的人请教，听听实战经验',
        mbtiDimension: 'SN',
        mbtiValue: 1,
      },
    ],
  },

  // --- T/F 维度 (2题) ---
  {
    id: 'm-tf-1',
    type: 'mbti',
    scene: '绩效评估',
    scenario: '你需要给一个平时关系不错的同事打绩效评分，他的表现确实一般。你会？',
    emoji: '📊',
    options: [
      {
        text: '根据客观指标公正评分，私底下再给他一些改进建议',
        mbtiDimension: 'TF',
        mbtiValue: 2,
      },
      {
        text: '考虑到他的难处，稍微打高一点，给他一些鼓励',
        mbtiDimension: 'TF',
        mbtiValue: -2,
      },
      {
        text: '严格按照评分标准来，但会在评语中写上他的优点',
        mbtiDimension: 'TF',
        mbtiValue: 1,
      },
    ],
  },
  {
    id: 'm-tf-2',
    type: 'mbti',
    scene: '决策时刻',
    scenario: '团队需要做一个重要决策，两个方案各有优劣。你倾向于？',
    emoji: '🎯',
    options: [
      {
        text: '用数据说话，做成本收益分析，选最优解',
        mbtiDimension: 'TF',
        mbtiValue: 2,
      },
      {
        text: '考虑每个方案对团队成员的影响，选择大家更能接受的',
        mbtiDimension: 'TF',
        mbtiValue: -2,
      },
      {
        text: '综合数据和团队意见，找一个平衡点',
        mbtiDimension: 'TF',
        mbtiValue: 0,
      },
    ],
  },

  // --- J/P 维度 (2题) ---
  {
    id: 'm-jp-1',
    type: 'mbti',
    scene: '旅行计划',
    scenario: '你要去一个没去过的城市出差三天。你会怎么安排行程？',
    emoji: '✈️',
    options: [
      {
        text: '提前做好详细日程表，每个时间段都安排好',
        mbtiDimension: 'JP',
        mbtiValue: 2,
      },
      {
        text: '只定好酒店和必须参加的会议，其他到了再说',
        mbtiDimension: 'JP',
        mbtiValue: -2,
      },
      {
        text: '列几个想去的地方，但具体顺序看当时的心情',
        mbtiDimension: 'JP',
        mbtiValue: -1,
      },
    ],
  },
  {
    id: 'm-jp-2',
    type: 'mbti',
    scene: '截止日期',
    scenario: '一个项目的截止日期是下周五。你通常怎么安排工作节奏？',
    emoji: '⏰',
    options: [
      {
        text: '周一就制定好每日计划，每天完成一部分，周四完成初稿',
        mbtiDimension: 'JP',
        mbtiValue: 2,
      },
      {
        text: '前几天先做其他事，周三开始集中精力冲刺',
        mbtiDimension: 'JP',
        mbtiValue: -2,
      },
      {
        text: '每天做一点，但保留弹性时间应对突发情况',
        mbtiDimension: 'JP',
        mbtiValue: 0,
      },
    ],
  },

  // ============================================================
  // 价值观 — 5 题 (薪资/成长/稳定/创意/影响力)
  // ============================================================

  {
    id: 'v-1',
    type: 'value',
    scene: '两份offer',
    scenario: '你同时拿到了两份offer：A公司月薪2万但工作内容重复，B公司月薪1.5万但能接触核心业务。你选？',
    emoji: '💰',
    options: [
      {
        text: '选A，钱多才是硬道理，生活品质不能妥协',
        valueCategory: 'salary',
        valueScore: 3,
      },
      {
        text: '选B，能学到东西比多几千块重要得多',
        valueCategory: 'growth',
        valueScore: 3,
      },
      {
        text: '看哪个公司更有前景，选发展空间大的',
        valueCategory: 'impact',
        valueScore: 2,
      },
    ],
  },
  {
    id: 'v-2',
    type: 'value',
    scene: '工作三年后',
    scenario: '工作三年后，你更希望自己处于什么状态？',
    emoji: '🌟',
    options: [
      {
        text: '成为某个领域的专家，被行业认可',
        valueCategory: 'growth',
        valueScore: 3,
      },
      {
        text: '在一家稳定的大公司，有清晰的晋升路径',
        valueCategory: 'stability',
        valueScore: 3,
      },
      {
        text: '做出了有影响力的作品或产品，改变了很多人',
        valueCategory: 'impact',
        valueScore: 3,
      },
    ],
  },
  {
    id: 'v-3',
    type: 'value',
    scene: '理想工作日',
    scenario: '你心目中最理想的工作日是什么样的？',
    emoji: '☀️',
    options: [
      {
        text: '每天能做一些有创意的事情，工作本身就是享受',
        valueCategory: 'creativity',
        valueScore: 3,
      },
      {
        text: '朝九晚五，工作生活平衡，不用加班',
        valueCategory: 'stability',
        valueScore: 3,
      },
      {
        text: '和一群优秀的人一起解决有挑战性的问题',
        valueCategory: 'growth',
        valueScore: 2,
      },
    ],
  },
  {
    id: 'v-4',
    type: 'value',
    scene: '年终奖',
    scenario: '今年公司效益不错，你更希望年终奖怎么发？',
    emoji: '🎁',
    options: [
      {
        text: '直接发现金，越多越好',
        valueCategory: 'salary',
        valueScore: 3,
      },
      {
        text: '给更多带薪假期和灵活工作时间',
        valueCategory: 'stability',
        valueScore: 3,
      },
      {
        text: '提供培训基金和学习资源',
        valueCategory: 'growth',
        valueScore: 3,
      },
    ],
  },
  {
    id: 'v-5',
    type: 'value',
    scene: '五年规划',
    scenario: '如果五年后你可以成为任何一种人，你最想成为？',
    emoji: '🔮',
    options: [
      {
        text: '一个创意无限的设计师或创作者，作品被很多人喜爱',
        valueCategory: 'creativity',
        valueScore: 3,
      },
      {
        text: '一个能影响行业走向的领导者或意见领袖',
        valueCategory: 'impact',
        valueScore: 3,
      },
      {
        text: '一个财务自由、生活从容的人',
        valueCategory: 'salary',
        valueScore: 3,
      },
    ],
  },

  // ============================================================
  // 软技能 — 6 题 (沟通力/执行力/创造力/抗压性/分析力/领导力)
  // ============================================================

  {
    id: 'ss-1',
    type: 'softskill',
    scene: '跨部门协作',
    scenario: '你需要和其他部门合作完成一个任务，但对方一直拖延不配合。你会？',
    emoji: '🤝',
    options: [
      {
        text: '约对方喝杯咖啡，面对面沟通，了解对方的难处，找到双赢方案',
        softSkill: 'communication',
        softSkillScore: 3,
      },
      {
        text: '直接找对方领导协调，用正式渠道推进',
        softSkill: 'execution',
        softSkillScore: 3,
      },
      {
        text: '先自己把能做的部分做完，降低对对方的依赖',
        softSkill: 'resilience',
        softSkillScore: 2,
      },
    ],
  },
  {
    id: 'ss-2',
    type: 'softskill',
    scene: '紧急任务',
    scenario: '周五下午5点，领导突然交给你一个周一要交付的任务。你会？',
    emoji: '🔥',
    options: [
      {
        text: '立刻列出任务清单，分清优先级，周末加班也要按时完成',
        softSkill: 'execution',
        softSkillScore: 3,
      },
      {
        text: '先评估任务量和可行性，再决定是否需要协调资源',
        softSkill: 'analysis',
        softSkillScore: 3,
      },
      {
        text: '深呼吸，告诉自己这是展示能力的机会，然后开始行动',
        softSkill: 'resilience',
        softSkillScore: 3,
      },
    ],
  },
  {
    id: 'ss-3',
    type: 'softskill',
    scene: '头脑风暴',
    scenario: '团队头脑风暴，大家想法都差不多，缺乏新意。你会？',
    emoji: '💡',
    options: [
      {
        text: '提出一个看似疯狂的跨界想法，打破思维定式',
        softSkill: 'creativity',
        softSkillScore: 3,
      },
      {
        text: '用思维导图梳理现有想法，找到可以组合创新的地方',
        softSkill: 'analysis',
        softSkillScore: 2,
      },
      {
        text: '引导大家从用户角度重新思考问题',
        softSkill: 'leadership',
        softSkillScore: 2,
      },
    ],
  },
  {
    id: 'ss-4',
    type: 'softskill',
    scene: '方案被否',
    scenario: '你精心准备了一个月的方案被领导否决了。你会？',
    emoji: '😤',
    options: [
      {
        text: '虽然很失落，但会快速调整心态，分析被否决的原因，改进后重新提交',
        softSkill: 'resilience',
        softSkillScore: 3,
      },
      {
        text: '找领导详细沟通，了解具体哪里不满意，对症下药',
        softSkill: 'communication',
        softSkillScore: 3,
      },
      {
        text: '重新审视问题，用数据证明自己方案的可行性',
        softSkill: 'analysis',
        softSkillScore: 2,
      },
    ],
  },
  {
    id: 'ss-5',
    type: 'softskill',
    scene: '数据迷局',
    scenario: '市场部给你一堆杂乱的销售数据，让你找出业绩下滑的原因。你会？',
    emoji: '📈',
    options: [
      {
        text: '用Excel或Python清洗数据，做可视化分析，找出关键变量',
        softSkill: 'analysis',
        softSkillScore: 3,
      },
      {
        text: '先和一线销售人员聊聊，从他们那里获取第一手信息',
        softSkill: 'communication',
        softSkillScore: 3,
      },
      {
        text: '搭建一个自动化报表系统，以后可以持续监控',
        softSkill: 'execution',
        softSkillScore: 2,
      },
    ],
  },
  {
    id: 'ss-6',
    type: 'softskill',
    scene: '新人带教',
    scenario: '领导让你带一个刚毕业的新人，三个月内让他能独立工作。你会？',
    emoji: '🎓',
    options: [
      {
        text: '制定详细的培养计划，每周设定目标，定期复盘',
        softSkill: 'leadership',
        softSkillScore: 3,
      },
      {
        text: '让他跟着自己做项目，在实践中边做边学',
        softSkill: 'execution',
        softSkillScore: 2,
      },
      {
        text: '鼓励他多问问题，创造一个安全的学习环境',
        softSkill: 'communication',
        softSkillScore: 3,
      },
    ],
  },
];
