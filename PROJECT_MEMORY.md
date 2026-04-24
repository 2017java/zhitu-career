# PROJECT MEMORY
> 本文件由 project-memory skill 自动生成，记录项目关键信息供后续参考。
> 请勿手动大幅修改，可在各条目下方追加备注。

---

## [BUG RECORD] AI调用在Vercel部署后失败（核心Bug） — 2026-04-22 21:30

### 问题现象
- Vercel部署成功，页面正常加载
- JD解读点击"开始解读"后，AI分析失败，自动降级为关键词匹配
- 控制台报错：`AI analysis failed, falling back to keyword analysis: AbortError: signal is aborted without reason`
- `/api/health` 返回环境变量正确
- `/api/test-ai`（简单短prompt）调用成功返回 `{"success":true}`

### 环境信息
- 部署平台：Vercel Hobby（免费版）
- 框架：Next.js 16.2.4 + React 19.2.4
- AI接口：火山方舟 CodingPlan API（OpenAI兼容）
- 模型：`doubao-seed-2.0-pro`

### 根本原因（三层问题叠加）

**问题1：客户端直接调用OpenAI SDK**
- `analyzeJD()` → `chatWithAI()` → `new OpenAI({dangerouslyAllowBrowser: false})`
- OpenAI SDK禁止在浏览器端运行，`dangerouslyAllowBrowser: false` 会阻止创建client
- **修复**：新增 `chatWithAIProxy()` 函数，通过 `/api/ai/chat` 服务端路由代理AI请求

**问题2：API路由模块顶层初始化OpenAI**
- `src/app/api/ai/chat/route.ts` 在模块顶层 `new OpenAI({apiKey: process.env.ARK_API_KEY})`
- Vercel serverless函数冷启动时，如果环境变量未加载会崩溃
- **修复**：改为延迟初始化 `getClient()` 函数，只在POST请求中按需创建client

**问题3：客户端AbortController导致请求被意外取消**
- `chatWithAIProxy` 使用 `AbortController` + `setTimeout(15000)` 做客户端超时
- `AbortError: signal is aborted without reason` 说明请求被外部abort，不是超时
- 可能原因：React组件卸载、StrictMode双重渲染、或浏览器页面导航
- **修复**：完全移除客户端的 `AbortController`，超时由服务端 `maxDuration=60` 控制

### 最终解决方案

**`src/lib/ai/client.ts`** — 两个函数：
```typescript
// 服务端直接调用（仅用于server components/API routes）
export async function chatWithAI(systemPrompt, userMessage, timeoutMs = 8000)

// 浏览器端通过API路由代理调用（用于client components）
export async function chatWithAIProxy(systemPrompt, userMessage)
// 注意：不使用AbortController，不设置客户端超时
```

**`src/app/api/ai/chat/route.ts`** — API路由：
```typescript
// 关键配置
export const maxDuration = 60; // Vercel Hobby默认10秒，必须显式延长

// 延迟初始化OpenAI client
let _client: OpenAI | null = null;
function getClient(): OpenAI {
  if (!_client) {
    _client = new OpenAI({ apiKey: process.env.ARK_API_KEY, baseURL: ... });
  }
  return _client;
}
```

**`src/lib/jd-decoder/analyzer.ts`** — 调用方：
```typescript
// 使用chatWithAIProxy（浏览器端），不是chatWithAI（服务端）
const aiResponse = await chatWithAIProxy(JD_DECODER_PROMPT, jdText);
```

### 踩过的坑（无效方案）
- ❌ 只改 `chatWithAI` 的超时时间 → 失败，问题不在超时长短
- ❌ 只添加 `maxDuration=60` → 失败，AbortController仍在客户端abort
- ❌ 怀疑环境变量配置错误 → 失败，`/api/health` 和 `/api/test-ai` 证明变量正确
- ❌ 怀疑CSP策略阻止 → 失败，CSP报错是Next.js框架自身的，与AI无关

### 预防措施
- **浏览器端永远不要直接调用OpenAI SDK**，必须通过API路由代理
- **API路由中涉及环境变量的第三方库，一律使用延迟初始化**
- **Vercel Hobby版serverless函数默认10秒超时**，AI等耗时操作必须设置 `maxDuration`
- **不要在客户端使用AbortController做fetch超时**，交给服务端控制
- **部署后用 `/api/health` 验证环境变量，用 `/api/test-ai` 验证AI调用链路**

### AI调用完整链路（正确方式）
```
浏览器(client component)
  → fetch('/api/ai/chat', {method: 'POST', body: JSON.stringify({systemPrompt, userMessage})})
  → Vercel Serverless Function (route.ts, maxDuration=60)
    → new OpenAI({apiKey: env.ARK_API_KEY, baseURL: env.ARK_BASE_URL})
    → openai.chat.completions.create({model: env.ARK_MODEL, ...})
    → 火山方舟 API
    → 返回JSON结果
  ← 浏览器接收并解析JSON
```

### 参考资料
- Vercel Serverless Function超时：Hobby默认10s，Pro默认60s，可通过 `maxDuration` 配置到300s
- OpenAI SDK `dangerouslyAllowBrowser`：默认false，禁止浏览器端使用

---

## [BUG RECORD] Next.js 16.2.x dev模式hydrateRoot不调用 — 2026-04-22 18:50

### 问题现象
- "开始探索"按钮点击无反应
- Chrome控制台报错：`WebSocket connection to 'wss://.../_next/webpack-hmr' failed`
- production模式不受影响

### 根本原因
Next.js 16.2.x dev模式使用WebSocket-backed debug channel传递React Flight组件初始化依赖。PR #91503将缓存策略改为`no-cache`，页面从HTTP缓存恢复时WebSocket不重发debug数据，导致`hydrateRoot`不被调用。

### 解决方案
使用 `npm run build && npm run start` 运行，不用 `npm run dev`。

### 参考资料
- GitHub PR #92892（2026-04-16合并）

---

## [BUG RECORD] 测评结果页JD匹配404 + 保存按钮无反应 — 2026-04-22 19:30

### 问题现象
- 测评结束点击"开始JD分析"报404
- JD解读"保存并继续匹配"按钮无反应

### 解决方案
- `router.push("/jd")` → `router.push("/jd-decoder")`
- 保存按钮添加 `onClick={onSave}` + `router.push("/match")`

---

## [BUG RECORD] OpenAI client模块顶层初始化 — 2026-04-22 18:55

### 问题现象
- 构建时报错 `Missing credentials`

### 解决方案
改为延迟初始化 `getClient()`，只在首次调用时创建client实例。

---

## [PROJECT SUMMARY] 知途 · ZhiTu Career — 2026-04-22 21:30

### 项目背景
> AI驱动的职业探索平台，面向中国大学生，测评+JD解读+匹配+简历优化。

### 技术架构
- **技术栈**：Next.js 16.2.4 + React 19.2.4 + TypeScript + Tailwind CSS 4 + shadcn/ui v4
- **AI接口**：火山方舟 CodingPlan API（OpenAI兼容），通过 `/api/ai/chat` 路由代理
- **数据持久化**：localStorage（key前缀 `zhitu_`）
- **部署**：Vercel（主）+ GitHub Pages（静态备份）

### 关键文件路径
- `src/lib/ai/client.ts` — AI客户端（chatWithAI=服务端，chatWithAIProxy=浏览器端）
- `src/app/api/ai/chat/route.ts` — AI API路由（maxDuration=60，延迟初始化）
- `src/app/api/health/route.ts` — 环境变量健康检查
- `src/lib/jd-decoder/analyzer.ts` — JD解读引擎（AI优先+关键词降级）
- `src/hooks/useJDDecoder.ts` — JD解读状态管理
- `next.config.ts` — Next.js配置（Vercel部署不需要basePath和output:export）

### 部署配置
- **Vercel环境变量**：`ARK_API_KEY`、`ARK_BASE_URL`、`ARK_MODEL`（三个Environment都勾选）
- **GitHub Pages**：workflow中临时添加 `output:export` + `basePath:/zhitu-career`
- **不要用 `npm run dev`**：Next.js 16.2.x dev模式有hydration bug

### 当前进度
- [x] 职业测评模块（43题场景题，4阶段流程，结果可视化）
- [x] JD智能解读模块（AI+关键词降级，Vercel部署验证通过）
- [x] SBTI旅程系统（5阶段badge解锁）
- [x] Vercel部署（AI功能可用）+ GitHub Pages部署（静态备份）
- [ ] 匹配分析模块（页面已有，功能待完善）
- [ ] 简历优化模块（页面已有，功能待完善）

### Agent 接手须知
> **最重要**：
> 1. 浏览器端调用AI必须用 `chatWithAIProxy`（通过API路由），不能用 `chatWithAI`（直接调OpenAI）
> 2. API路由必须设置 `maxDuration = 60`，否则Vercel默认10秒超时
> 3. 涉及环境变量的第三方库一律延迟初始化，不要在模块顶层 `new XXX()`
> 4. 不要在客户端fetch中使用AbortController做超时，交给服务端控制
> 5. 用 `npm run build && npm run start` 运行，不要用 `npm run dev`
