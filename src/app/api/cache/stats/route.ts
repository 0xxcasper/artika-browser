import { NextResponse } from 'next/server';
import { prismicServerCache } from '@/libs/prismic-server-cache';

export async function GET() {
  try {
    const stats = prismicServerCache.getStats();
    return NextResponse.json({
      success: true,
      stats,
      message: 'Cache statistics retrieved successfully'
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to get cache statistics'
      },
      { status: 500 }
    );
  }
} 