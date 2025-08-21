'use client';

import { LanguageProvider } from '@/contexts/LanguageContext';
import { PreloaderProvider } from '@/contexts/PreloaderContext';
import { ChakraProvider } from '@chakra-ui/react';
import { ReactNode } from 'react';

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
