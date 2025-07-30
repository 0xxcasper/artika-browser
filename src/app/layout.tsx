import type { Metadata } from 'next';
import { Inter, Raleway, Playfair, Roboto } from 'next/font/google';
import Navigation from '@/components/navigation';
import '@/styles/global.scss';
import Providers from './providers';
import Footer from '@/components/footer';

const inter = Inter({ subsets: ['latin'] });

const playfair = Playfair({ 
  subsets: ['latin', 'vietnamese'],
  variable: '--font-playfair',
  display: 'swap',
});

const raleway = Raleway({ 
  subsets: ['latin', 'vietnamese'],
  variable: '--font-raleway',
  display: 'swap',
});

const graphik = Roboto({ 
  subsets: ['latin', 'vietnamese'],
  variable: '--font-graphik',
  display: 'swap',
  weight: ['400', '500', '700'],
});

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
      </head>
      <body className={`${inter.className} ${playfair.variable} ${raleway.variable} ${graphik.variable}`}>
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