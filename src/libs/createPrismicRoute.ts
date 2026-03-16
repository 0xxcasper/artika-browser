import { NextResponse } from 'next/server';
import { createClient } from '@/libs/prismic';
import type { PrismicApiResponse } from '@/types/prismic';

/**
 * Factory function to create a GET route handler for fetching a single Prismic document.
 * @param documentType - The Prismic document type to fetch
 * @param label - Human-readable label for error messages
 */
export function createPrismicSingleRoute(documentType: string, label: string) {
  return async function GET() {
    try {
      const client = createClient();
      const doc = await client.getSingle(documentType as any);

      const response: PrismicApiResponse = {
        data: doc.data,
        id: doc.id,
        uid: doc.uid,
      };
      return NextResponse.json(response);
    } catch (error) {
      console.error(`Error fetching ${label} data:`, error);
      return NextResponse.json(
        {
          error: `Failed to fetch ${label} data`,
          details: error instanceof Error ? error.message : 'Unknown error',
        },
        { status: 500 },
      );
    }
  };
}
