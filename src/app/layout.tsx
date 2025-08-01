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
        {/* Google Fonts preconnect */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        {/* Google Fonts CSS - Only Playfair and Raleway */}
        <link href="https://fonts.googleapis.com/css2?family=Playfair:ital,opsz,wght@0,5..1200,300..900;1,5..1200,300..900&family=Raleway:ital,wght@0,100..900;1,100..900&display=swap" rel="stylesheet" />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
} 