import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Navigation from '@/components/navigation';
import '@/styles/global.scss';
import Providers from './providers';
import Footer from '@/components/footer';

const inter = Inter({ subsets: ['latin'] });

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
        {/* Critical font preload - highest priority */}
        <link 
          rel="preload" 
          href="/fonts/Baskervville-Regular.ttf" 
          as="font" 
          type="font/ttf" 
          crossOrigin="anonymous"
          fetchPriority="high"
        />
        <link 
          rel="preload" 
          href="/fonts/Raleway-Regular.ttf" 
          as="font" 
          type="font/ttf" 
          crossOrigin="anonymous"
          fetchPriority="high"
        />
      </head>
      <body className={inter.className}>
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