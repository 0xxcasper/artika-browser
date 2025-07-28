import { NextResponse } from 'next/server';
import { createClient } from '@/libs/prismic';

export async function GET() {
  try {
    console.log('Repository name:', process.env.PRISMIC_REPOSITORY_NAME);
    console.log('Access token exists:', !!process.env.PRISMIC_ACCESS_TOKEN);
    
    const client = createClient();
    
    console.log('Client created successfully');
    
    const homepage = await client.getSingle('homepage');
    
    console.log('Homepage fetched:', !!homepage);
    
    return NextResponse.json({
      data: homepage.data,
      id: homepage.id,
      uid: homepage.uid,
    });
  } catch (error) {
    console.error('Error fetching homepage data:', error);
    return NextResponse.json(
      { 
        error: 'Failed to fetch homepage data',
        details: error instanceof Error ? error.message : 'Unknown error',
        repository: process.env.PRISMIC_REPOSITORY_NAME,
        hasToken: !!process.env.PRISMIC_ACCESS_TOKEN
      },
      { status: 500 }
    );
  }
} 