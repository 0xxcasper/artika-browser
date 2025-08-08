import { headers } from 'next/headers';
import { createClient } from '@/libs/prismic';
import HomePage from '@/modules/home';

export default async function RootPage() {
  // Detect locale from URL
  const headersList = headers();
  const pathname = headersList.get('x-invoke-path') || '';

  let locale = 'en'; // default
  if (pathname.startsWith('/vi/') || pathname === '/vi') {
    locale = 'vi';
  }

  try {
    console.log('Fetching fresh data for:', locale);
    const client = createClient();
    const homepage = await client.getSingle('homepage', {
      lang: locale === 'vi' ? 'vi' : 'en-us',
    });

    console.log('homepage data:', homepage.data);

    return <HomePage homepageData={homepage as any} lang={locale} />;
  } catch (error) {
    console.error('Error fetching homepage data:', error);

    // Fallback khi không có dữ liệu từ Prismic
    return <HomePage homepageData={null} lang={locale} />;
  }
}
