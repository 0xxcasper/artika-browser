'use client';

import { ChakraProvider } from '@chakra-ui/react';
import { LanguageProvider } from '@/contexts/LanguageContext';
import { ReactNode } from 'react';
import { PreloaderProvider } from '@/contexts/PreloaderContext';

interface ProvidersProps {
  children: ReactNode;
  language: 'en' | 'vi';
}

export default function Providers({ children, language }: ProvidersProps) {
  return (
    <ChakraProvider>
      <LanguageProvider language={language}>
        <PreloaderProvider timeout={3000}>{children}</PreloaderProvider>
      </LanguageProvider>
    </ChakraProvider>
  );
}
