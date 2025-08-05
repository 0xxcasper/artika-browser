import * as prismic from '@slicemachine/config';

const config = prismic.createConfig({
  repositoryName: process.env.PRISMIC_REPOSITORY_NAME || 'artika-sapa',
  adapter: '@slicemachine/adapter-next',
  libraries: ['./src/slices'],
  // Use the unified Prismic client
  client: './src/libs/prismic.ts',
});

export default config; 