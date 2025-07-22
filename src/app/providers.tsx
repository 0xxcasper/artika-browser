'use client';

import { ChakraProvider } from '@chakra-ui/react';
import { LanguageProvider } from '@/contexts/LanguageContext';
import { ReactNode } from 'react';

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <ChakraProvider>
      <LanguageProvider>
        {children}
      </LanguageProvider>
    </ChakraProvider>
  );
} 