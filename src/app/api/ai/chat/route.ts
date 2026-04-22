import { NextRequest } from 'next/server';
import OpenAI from 'openai';

// 延迟初始化，避免冷启动时环境变量未加载导致崩溃
let _client: OpenAI | null = null;

function getClient(): OpenAI {
  if (!_client) {
    const apiKey = process.env.ARK_API_KEY;
    const baseURL = process.env.ARK_BASE_URL || 'https://ark.cn-beijing.volces.com/api/coding/v3';

    if (!apiKey) {
      throw new Error('ARK_API_KEY environment variable is not set');
    }

    _client = new OpenAI({ apiKey, baseURL });
  }
  return _client;
}

// Vercel Hobby 默认10秒超时，AI请求需要更长时间
export const maxDuration = 60;

export async function POST(request: NextRequest) {
  try {
    const { systemPrompt, userMessage } = await request.json();

    if (!systemPrompt || !userMessage) {
      return new Response(JSON.stringify({ error: 'Missing systemPrompt or userMessage' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const client = getClient();
    const response = await client.chat.completions.create({
      model: process.env.ARK_MODEL || 'doubao-pro-128k',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userMessage },
      ],
      temperature: 0.7,
      max_tokens: 2000,
    });

    const content = response.choices[0]?.message?.content || '';

    return new Response(JSON.stringify({ content }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    console.error('AI API error:', message);
    return new Response(JSON.stringify({ error: message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
