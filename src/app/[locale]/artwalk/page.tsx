import { notFound } from 'next/navigation';

interface LocaleArtwalkPageProps {
  params: {
    locale: string;
  };
}

export default function LocaleArtwalkPage({ params }: LocaleArtwalkPageProps) {
  const { locale } = params;
  
  // Validate locale
  if (!['en', 'vi'].includes(locale)) {
    notFound();
  }

  // Redirect to a default artwalk category or show artwalk index
  return (
    <div>
      <h1>Artwalk Index - {locale}</h1>
      <p>This is the artwalk index page for locale: {locale}</p>
    </div>
  );
} 