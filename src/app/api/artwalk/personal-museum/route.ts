import { createClient } from '@/libs/prismic';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    console.log('Repository name:', process.env.PRISMIC_REPOSITORY_NAME);
    console.log('Access token exists:', !!process.env.PRISMIC_ACCESS_TOKEN);

    const client = createClient();

    console.log('Client created successfully');

    const personalMuseum = await client.getSingle('personal_museum' as any);

    console.log('Personal Museum fetched:', !!personalMuseum);

    return NextResponse.json({
      data: personalMuseum.data,
      id: personalMuseum.id,
      uid: personalMuseum.uid,
    });
  } catch (error) {
    console.error('Error fetching personal museum data:', error);
    return NextResponse.json(
      {
        error: 'Failed to fetch personal museum data',
        details: error instanceof Error ? error.message : 'Unknown error',
        repository: process.env.PRISMIC_REPOSITORY_NAME,
        hasToken: !!process.env.PRISMIC_ACCESS_TOKEN,
      },
      { status: 500 },
    );
  }
}
