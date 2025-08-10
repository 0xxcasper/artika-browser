import Providers from '@/app/providers';
import Footer from '@/components/footer';
import Navigation from '@/components/navigation';
import '@/styles/global.scss';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

const locales = ['en', 'vi'];

interface LocaleLayoutProps {
  children: React.ReactNode;
  params: {
    locale: string;
  };
}

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export const metadata: Metadata = {
  // title: 'Artika',
  // description: 'Experience luxury and comfort',
};

export default function LocaleLayout({ children, params }: LocaleLayoutProps) {
  const { locale } = params;

  // Validate locale
  if (!locales.includes(locale)) {
    notFound();
  }

  return (
    <Providers language={locale as 'en' | 'vi'}>
      <Navigation />
      <main style={{ minHeight: '100dvh' }}>{children}</main>
      <Footer />
    </Providers>
  );
}
