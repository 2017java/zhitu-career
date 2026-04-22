import OpenAI from 'openai';

// 延迟初始化 OpenAI client，避免在构建时因缺少环境变量而报错
let _client: OpenAI | null = null;

function getClient(): OpenAI {
  if (!_client) {
    const apiKey = process.env.ARK_API_KEY;
    const baseURL = process.env.ARK_BASE_URL || 'https://ark.cn-beijing.volces.com/api/coding/v3';

    if (!apiKey) {
      throw new Error('ARK_API_KEY environment variable is not set');
    }

    _client = new OpenAI({
      apiKey,
      baseURL,
      dangerouslyAllowBrowser: false,
    });
  }
  return _client;
}

export async function chatWithAI(systemPrompt: string, userMessage: string, timeoutMs = 8000): Promise<string> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const client = getClient();
    const response = await client.chat.completions.create({
      model: process.env.ARK_MODEL || 'doubao-pro-128k',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userMessage },
      ],
      temperature: 0.7,
      max_tokens: 2000,
    }, {
      signal: controller.signal,
    });

    clearTimeout(timeout);
    return response.choices[0]?.message?.content || '';
  } catch (error) {
    clearTimeout(timeout);
    throw error;
  }
}

/**
 * 浏览器端调用AI — 通过 /api/ai/chat 路由代理
 */
export async function chatWithAIProxy(systemPrompt: string, userMessage: string, timeoutMs = 15000): Promise<string> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const response = await fetch('/api/ai/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ systemPrompt, userMessage }),
      signal: controller.signal,
    });

    clearTimeout(timeout);

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || `AI request failed: ${response.status}`);
    }

    const data = await response.json();
    return data.content || '';
  } catch (error) {
    clearTimeout(timeout);
    throw error;
  }
}
