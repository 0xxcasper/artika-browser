import { NextResponse } from 'next/server';
import { createClient } from '@/libs/prismic';

export async function GET() {
  try {
    console.log('Repository name:', process.env.PRISMIC_REPOSITORY_NAME);
    console.log('Access token exists:', !!process.env.PRISMIC_ACCESS_TOKEN);
    
    const client = createClient();
    
    console.log('Client created successfully');
    
    const forestBathing = await client.getSingle('forest_bathing');
    
    console.log('Forest bathing fetched:', !!forestBathing);
    
    return NextResponse.json({
      data: forestBathing.data,
      id: forestBathing.id,
      uid: forestBathing.uid,
    });
  } catch (error) {
    console.error('Error fetching forest bathing data:', error);
    return NextResponse.json(
      { 
        error: 'Failed to fetch forest bathing data',
        details: error instanceof Error ? error.message : 'Unknown error',
        repository: process.env.PRISMIC_REPOSITORY_NAME,
        hasToken: !!process.env.PRISMIC_ACCESS_TOKEN
      },
      { status: 500 }
    );
  }
}
