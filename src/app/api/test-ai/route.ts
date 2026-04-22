import { NextResponse } from 'next/server';
import OpenAI from 'openai';

export async function POST() {
  try {
    const apiKey = process.env.ARK_API_KEY;
    const baseURL = process.env.ARK_BASE_URL || 'https://ark.cn-beijing.volces.com/api/coding/v3';
    const model = process.env.ARK_MODEL || 'doubao-pro-128k';

    if (!apiKey) {
      return NextResponse.json({ error: 'ARK_API_KEY not set' }, { status: 500 });
    }

    const client = new OpenAI({ apiKey, baseURL });

    const response = await client.chat.completions.create({
      model,
      messages: [
        { role: 'user', content: '你好，请回复"测试成功"' },
      ],
      max_tokens: 50,
    });

    return NextResponse.json({
      success: true,
      model,
      response: response.choices[0]?.message?.content,
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({
      success: false,
      error: message,
      model: process.env.ARK_MODEL,
      baseURL: process.env.ARK_BASE_URL,
    }, { status: 500 });
  }
}
