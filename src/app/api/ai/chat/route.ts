import { NextRequest } from 'next/server';
import OpenAI from 'openai';

const client = new OpenAI({
  apiKey: process.env.ARK_API_KEY,
  baseURL: process.env.ARK_BASE_URL || 'https://ark.cn-beijing.volces.com/api/coding/v3',
});

export async function POST(request: NextRequest) {
  try {
    const { systemPrompt, userMessage } = await request.json();

    if (!systemPrompt || !userMessage) {
      return new Response(JSON.stringify({ error: 'Missing systemPrompt or userMessage' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

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
