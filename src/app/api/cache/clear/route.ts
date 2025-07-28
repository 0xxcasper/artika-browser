import { NextResponse } from 'next/server';
import { prismicServerCache } from '@/libs/prismic-server-cache';

export async function POST() {
  try {
    prismicServerCache.clear();
    return NextResponse.json({ 
      success: true, 
      message: 'Server cache cleared successfully' 
    });
  } catch (error) {
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to clear server cache' 
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    prismicServerCache.cleanup(); // Clear expired items
    const stats = prismicServerCache.getStats();
    return NextResponse.json({ 
      success: true, 
      message: 'Server cache cleanup completed',
      stats
    });
  } catch (error) {
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to cleanup server cache' 
      },
      { status: 500 }
    );
  }
} 