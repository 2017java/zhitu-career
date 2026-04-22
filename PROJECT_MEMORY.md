# PROJECT MEMORY
> 本文件由 project-memory skill 自动生成，记录项目关键信息供后续参考。
> 请勿手动大幅修改，可在各条目下方追加备注。

---

## [BUG RECORD] Next.js 16.2.x dev模式hydrateRoot不调用导致所有onClick失效 — 2026-04-22 18:50

### 问题现象
- "开始探索"按钮点击无反应，页面无任何变化
- "JD解读"按钮点击无反应
- Chrome控制台报错：`WebSocket connection to 'wss://.../_next/webpack-hmr' failed`
- 用户在真实Chrome浏览器中复现，非模拟浏览器问题

### 环境信息
- Next.js 16.2.4 + React 19.2.4
- 触发条件：`npm run dev` 启动后，页面从HTTP缓存恢复（浏览器前进/后退、标签页复制、或首次加载时WebSocket连接失败）
- production模式（`npm run build && npm run start`）不受影响

### 根本原因
Next.js 16.2.x dev模式使用WebSocket-backed debug channel传递React Flight组件初始化依赖。PR #91503将dev模式缓存策略从`no-store`改为`no-cache`，允许浏览器缓存页面。当页面从HTTP缓存恢复时，WebSocket不会重新发送debug数据，导致debug依赖永远无法满足，`hydrateRoot`永远不会被调用，**页面失去所有交互能力**。

**证据**：GitHub PR [#92892](https://github.com/vercel/next.js/pull/92892)（2026-04-16合并到canary）明确描述了此问题。

### 解决方案
**使用production模式运行**：`npm run build && npm run start`。production模式没有debug channel，不受此bug影响。等待Next.js官方发布包含PR #92892修复的稳定版后可恢复使用dev模式。

### 踩过的坑（无效方案）
- ❌ 移除framer-motion的`initial={{ opacity: 0 }}` → 解决了SSR空白问题，但onClick仍不工作
- ❌ 将shadcn Button替换为原生`<button>` → 排除了@base-ui/react事件拦截，但onClick仍不工作
- ❌ 修复语法错误（painPoints数组缺少`{`） → 修复了构建错误，但onClick仍不工作
- ❌ 检查所有业务代码逻辑 → 代码逻辑无问题，问题在框架层面
- ❌ 怀疑是模拟浏览器限制 → 用户在真实Chrome中复现，排除此假设

### 预防措施
- 开发时使用`npm run build && npm run start`而非`npm run dev`
- 关注Next.js release notes，升级到包含PR #92892修复的版本后恢复dev模式
- WebSocket报错不是"无关紧要的警告"，可能是hydration失败的信号

### 参考资料
- [GitHub PR #92892 - Fix dev mode hydration failure when page is served from HTTP cache](https://github.com/vercel/next.js/pull/92892)
- [GitHub Issue #91908 - Client Component onClick events fail to fire](https://github.com/vercel/next.js/issues/91908)

---

## [BUG RECORD] OpenAI client模块顶层初始化导致JD解读页面崩溃 — 2026-04-22 18:55

### 问题现象
- JD解读页面在production模式下加载失败，显示"This page couldn't load"
- 控制台报错：`Uncaught Error: Missing credentials. Please pass an apiKey...`

### 根本原因
`src/lib/ai/client.ts`在模块顶层直接执行`new OpenAI({apiKey: process.env.ARK_API_KEY, ...})`。Next.js在构建时会import所有模块，如果此时环境变量不可用就会抛出异常，导致整个JD解读页面的组件树崩溃。

### 解决方案
将OpenAI client改为延迟初始化（lazy initialization），只在第一次调用`chatWithAI`时才创建client实例：

```typescript
let _client: OpenAI | null = null;
function getClient(): OpenAI {
  if (!_client) {
    const apiKey = process.env.ARK_API_KEY;
    if (!apiKey) throw new Error('ARK_API_KEY environment variable is not set');
    _client = new OpenAI({ apiKey, baseURL: ... });
  }
  return _client;
}
```

### 预防措施
- 涉及环境变量的第三方库初始化，一律使用延迟初始化模式
- 不要在模块顶层执行可能有副作用的代码

---

## [PROJECT SUMMARY] 知途 · ZhiTu Career — 2026-04-22 19:00

### 项目背景
> AI驱动的职业探索平台，面向中国大学生，通过科学测评认清自我、通过JD智能解读读懂岗位、通过精准匹配找到差距，将求职过程变成一场有趣的星图探索之旅。

### 核心需求
- **职业测评模块**：Holland RIASEC（24题）+ MBTI（8题）+ 价值观（5题）+ 软技能（6题），共43道场景题，SBTI游戏化呈现
- **JD解读模块**：AI优先+关键词降级兜底，输出白话概括、硬/软技能拆解、职业路径、隐性要求、应届友好度
- **匹配分析模块**：将测评结果与JD解读结果进行匹配（待完善）
- **简历优化模块**：AI辅助简历优化（待完善）
- **SBTI游戏设计**：5阶段旅程系统（星图探索者→方向确认者→差距研判者→简历炼金师→求职冠军），带badge解锁

### 技术架构
- **技术栈**：Next.js 16.2.4 (App Router) + React 19.2.4 + TypeScript + Tailwind CSS 4 + shadcn/ui v4
- **AI接口**：火山方舟 CodingPlan API（OpenAI兼容），Base URL: `https://ark.cn-beijing.volces.com/api/coding/v3`
- **数据持久化**：localStorage（无后端数据库），key前缀`zhitu_`
- **部署目标**：GitHub Pages（纯静态，API走serverless）
- **设计系统**：Terracotta暖色系（#c96442主色），Noto Serif SC + Noto Sans SC字体

### 关键文件路径
- `src/app/page.tsx` — 首页
- `src/app/assessment/page.tsx` — 职业测评页（核心交互）
- `src/app/jd-decoder/page.tsx` — JD解读页
- `src/app/assessment/result/page.tsx` — 测评结果页（含星图可视化）
- `src/hooks/useAssessment.ts` — 测评状态管理hook
- `src/hooks/useJDDecoder.ts` — JD解读状态管理hook
- `src/hooks/useJourney.ts` — SBTI旅程进度hook
- `src/lib/assessment/` — 测评算法（Holland/MBTI/价值观/软技能）
- `src/lib/jd-decoder/` — JD解读引擎（AI+关键词+模板）
- `src/lib/ai/client.ts` — AI客户端（延迟初始化）
- `src/lib/ai/prompts.ts` — AI提示词
- `src/lib/storage.ts` — localStorage封装
- `src/components/layout/Navbar.tsx` — 顶部导航
- `src/components/layout/MobileTabBar.tsx` — 移动端底部Tab

### 当前进度
- [x] 项目初始化（Next.js 16 + React 19 + Tailwind 4 + shadcn/ui v4）
- [x] 设计系统（Terracotta暖色系，自定义主题变量）
- [x] 首页（Hero + 痛点卡片 + CTA + JourneyProgress）
- [x] 职业测评模块（43题场景题，4阶段测评流程，结果页星图可视化）
- [x] JD解读模块（AI+降级兜底，完整分析结果展示）
- [x] SBTI旅程系统（5阶段badge解锁）
- [x] 导航系统（桌面Navbar + 移动端TabBar）
- [ ] 匹配分析模块（页面已有，功能待完善）
- [ ] 简历优化模块（页面已有，功能待完善）
- [ ] 个人中心模块（页面已有，功能待完善）
- [ ] GitHub部署配置

### 关键决策记录
| 决策点 | 选择 | 原因 | 放弃的方案 |
|--------|------|------|------------|
| 状态管理 | React useState + useCallback | 项目规模小，不需要Redux/Zustand | Redux, Zustand |
| 数据持久化 | localStorage | 无后端，纯前端方案 | Supabase, IndexedDB |
| UI组件库 | shadcn/ui v4 | 可定制性强，但需注意@base-ui兼容性 | Ant Design, MUI |
| 动画方案 | 移除framer-motion | SSR兼容性问题，用CSS transition替代 | framer-motion |
| AI集成 | 火山方舟 CodingPlan API | OpenAI兼容接口，用户已有API key | 直接调用OpenAI |
| 运行模式 | production build（非dev） | Next.js 16.2.x dev模式有hydration bug | dev模式 |

### 已知问题或风险
- ⚠️ Next.js 16.2.x dev模式有hydration bug，必须用`npm run build && npm run start`运行
- ⚠️ shadcn/ui v4的Button组件使用@base-ui/react，可能与React 19事件不兼容（已用原生button替代）
- ⚠️ Badge组件仍使用@base-ui/react的useRender，目前无影响但需关注
- ⚠️ framer-motion仍作为依赖安装，可考虑移除

### 下一步行动
1. 完善匹配分析模块的核心功能
2. 完善简历优化模块的核心功能
3. 配置GitHub Pages部署
4. 等Next.js修复dev模式bug后升级版本

### Agent 接手须知
> **最重要**：必须用`npm run build && npm run start`运行项目，不要用`npm run dev`！这是Next.js 16.2.x的已知bug。
> - 环境变量在`.env.local`中（ARK_API_KEY, ARK_BASE_URL, ARK_MODEL）
> - AI client使用延迟初始化，不要在模块顶层`new OpenAI()`
> - 所有交互按钮使用原生`<button>`，不要用shadcn的Button组件
> - 页面组件必须标记`"use client"`
> - localStorage操作通过`src/lib/storage.ts`封装，有`typeof window`保护

---

## [BUG RECORD] 测评结果页JD匹配链接404 + JD解读保存按钮无反应 — 2026-04-22 19:30

### 问题现象
- 测评结束后点击"开始JD分析"按钮报404
- JD解读结果页"保存并继续匹配"按钮点击无反应
- JD解读结果页底部内容被移动端TabBar遮挡

### 根本原因
1. `src/app/assessment/result/page.tsx:752` 路由路径错误：`router.push("/jd")` 应为 `router.push("/jd-decoder")`
2. `src/app/jd-decoder/page.tsx:411` 保存按钮缺少`onClick`事件处理函数和padding样式
3. JD解读内容区域缺少底部padding，被MobileTabBar遮挡

### 解决方案
- 修正路由路径 `/jd` → `/jd-decoder`
- 为AnalysisResult组件添加`onSave` prop，点击后`router.push("/match")`
- 保存按钮添加`onClick={onSave}` + `px-4 py-2 rounded-lg inline-flex items-center`
- 内容区域添加`pb-24`底部padding

### 预防措施
- 所有router.push/link href必须与实际文件路径一致
- 按钮组件必须有onClick或明确的disabled状态
- 有底部固定导航栏的页面，内容区域必须预留足够的底部padding
