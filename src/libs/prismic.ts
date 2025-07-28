import * as prismic from '@prismicio/client';
import * as prismicNext from '@prismicio/next';

export const repositoryName = process.env.PRISMIC_REPOSITORY_NAME || 'artika-sapa';

console.log(process.env.PRISMIC_REPOSITORY_NAME);

export function createClient(config?: prismicNext.CreateClientConfig) {
  const client = prismic.createClient(repositoryName, {
    routes: [
      {
        type: 'homepage',
        path: '/',
      },
    ],
    accessToken: process.env.PRISMIC_ACCESS_TOKEN,
    ...config,
  });

  prismicNext.enableAutoPreviews({ client });

  return client;
}

export type HomepageDocument = prismic.PrismicDocumentWithUID<{
  slices: prismic.SliceZone;
}>; 