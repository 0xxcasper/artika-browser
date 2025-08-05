import type { Metadata } from 'next';
import '@/styles/global.scss';
import { headers } from 'next/headers';

export const metadata: Metadata = {
  // title: 'Artika',
  // description: 'Experience luxury and comfort',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Detect locale from URL
  const headersList = headers();
  const pathname = headersList.get('x-invoke-path') || '';
  
  let locale = 'en'; // default
  if (pathname.startsWith('/vi/') || pathname === '/vi') {
    locale = 'vi';
  }

  return (
    <html lang={locale}>
      <head>
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />

        {/* Safari-specific meta tags to prevent background issues */}
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Artika" />

        {/* Google Fonts preconnect */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

        
        {/* Google Fonts CSS - Only Playfair and Raleway */}
        {/* <link href="https://fonts.googleapis.com/css2?family=Playfair:ital,opsz,wght@0,5..1200,300..900;1,5..1200,300..900&family=Raleway:ital,wght@0,100..900;1,100..900&display=swap" rel="stylesheet" /> */}
        {/* <link href="https://fonts.googleapis.com/css2?family=Playfair:ital,opsz,wght@0,5..1200,300;1,5..1200,300&family=Raleway:ital,wght@0,100..900;1,100..900&display=swap" rel="stylesheet"></link> */}
        <link href="https://fonts.googleapis.com/css2?family=Raleway:ital,wght@0,100..900;1,100..900&display=swap" rel="stylesheet"></link>
      </head>
      <body>
        {children}
      </body>
    </html>
  );
} 