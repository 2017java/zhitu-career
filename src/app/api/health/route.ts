import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    status: 'ok',
    hasApiKey: !!process.env.ARK_API_KEY,
    apiKeyPrefix: process.env.ARK_API_KEY ? process.env.ARK_API_KEY.slice(0, 6) + '...' : 'not set',
    baseURL: process.env.ARK_BASE_URL || 'not set',
    model: process.env.ARK_MODEL || 'not set',
  });
}
