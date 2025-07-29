'use client';

import { ChakraProvider } from '@chakra-ui/react';
import { LanguageProvider } from '@/contexts/LanguageContext';
import { ReactNode } from 'react';
import { PreloaderProvider } from '@/contexts/PreloaderContext';

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <ChakraProvider>
      <LanguageProvider>
        <PreloaderProvider
          timeout={3000}
        >
          {children}
        </PreloaderProvider>
      </LanguageProvider>
    </ChakraProvider>
  );
} 