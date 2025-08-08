import { createClient } from '@/libs/prismic';
import HomePage from '@/modules/home';
import { notFound } from 'next/navigation';

interface LocalePageProps {
  params: {
    locale: string;
  };
}

export default async function LocalePage({ params }: LocalePageProps) {
  const { locale } = params;

  // Validate locale
  if (!['en', 'vi'].includes(locale)) {
    notFound();
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
