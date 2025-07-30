import { createClient } from '@/libs/prismic';
import HomePage from '@/modules/home';

interface PageProps {
  params: {
    lang?: string[];
  };
}

// Cache cho 5 phút (300 giây)
export const revalidate = 300;

export default async function Page({ params }: PageProps) {
  // Nếu không có lang hoặc lang[0] là 'en', sử dụng 'en'
  const lang = params.lang?.[0] || 'en';
  
  try {
    console.log('Fetching fresh data for:', lang);
    const client = createClient();
    const homepage = await client.getSingle('homepage', {
      lang: lang === 'vi' ? 'vi' : 'en-us'
    });

    console.log("homepage", homepage);

    return (
      <HomePage 
        homepageData={homepage as any}
        lang={lang}
      />
    );
  } catch (error) {
    console.error('Error fetching homepage data:', error);
    
    // Fallback khi không có dữ liệu từ Prismic
    return (
      <HomePage 
        homepageData={null}
        lang={lang}
      />
    );
  }
} 