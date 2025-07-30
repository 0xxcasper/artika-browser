import type { Metadata } from 'next';
import Navigation from '@/components/navigation';
import '@/styles/global.scss';
import Providers from './providers';
import Footer from '@/components/footer';

export const metadata: Metadata = {
  // title: 'Artika',
  // description: 'Experience luxury and comfort',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* Google Fonts preconnect */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        {/* Google Fonts CSS - Only Playfair and Raleway */}
        <link href="https://fonts.googleapis.com/css2?family=Playfair:ital,opsz,wght@0,5..1200,300..900;1,5..1200,300..900&family=Raleway:ital,wght@0,100..900;1,100..900&display=swap" rel="stylesheet" />
        
        {/* Critical font preload - highest priority */}
        <link 
          rel="preload" 
          href="/fonts/Baskervville-Regular.ttf" 
          as="font" 
          type="font/ttf" 
          crossOrigin="anonymous"
          fetchPriority="high"
        />
      </head>
      <body>
        <Providers>
          <Navigation />
          <main>
            {children}
          </main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
} 