import { NextResponse } from 'next/server';
import { createClient } from '@/libs/prismic';

export async function GET() {
  try {
    console.log('Repository name:', process.env.PRISMIC_REPOSITORY_NAME);
    console.log('Access token exists:', !!process.env.PRISMIC_ACCESS_TOKEN);

    const client = createClient();

    console.log('Client created successfully');

    const experiences = await client.getSingle('experiences');

    console.log('Experiences fetched:', !!experiences);

    return NextResponse.json({
      data: experiences.data,
      id: experiences.id,
      uid: experiences.uid,
    });
  } catch (error) {
    console.error('Error fetching experiences data:', error);
    return NextResponse.json(
      {
        error: 'Failed to fetch experiences data',
        details: error instanceof Error ? error.message : 'Unknown error',
        repository: process.env.PRISMIC_REPOSITORY_NAME,
        hasToken: !!process.env.PRISMIC_ACCESS_TOKEN,
      },
      { status: 500 },
    );
  }
}
