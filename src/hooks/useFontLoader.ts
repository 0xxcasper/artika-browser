import { useEffect, useState } from 'react';

interface UseFontLoaderOptions {
  fonts?: string[];
  timeout?: number;
  onLoad?: () => void;
  onTimeout?: () => void;
}

export function useFontLoader({
  fonts = ['Baskervville', 'Raleway'],
  timeout = 5000,
  onLoad,
  onTimeout
}: UseFontLoaderOptions = {}) {
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const [timeoutReached, setTimeoutReached] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(0);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    // Check if fonts are already loaded
    const checkFontsLoaded = () => {
      if (typeof document !== 'undefined' && document.fonts) {
        const loadedFonts = fonts.filter(font => {
          return document.fonts.check(`12px "${font}"`);
        });
        
        const progress = (loadedFonts.length / fonts.length) * 100;
        setLoadingProgress(progress);
        
        console.log(`Font loading progress: ${loadedFonts.length}/${fonts.length} (${progress}%)`);
        console.log('Loaded fonts:', loadedFonts);
        console.log('All fonts:', fonts);
        
        if (loadedFonts.length === fonts.length) {
          console.log('All fonts loaded successfully!');
          setFontsLoaded(true);
          onLoad?.();
          return true;
        }
      }
      return false;
    };

    // Set timeout
    timeoutId = setTimeout(() => {
      console.warn('Font loading timeout reached');
      setTimeoutReached(true);
      setFontsLoaded(true); // Force load even if fonts aren't ready
      onTimeout?.();
    }, timeout);

    // Check fonts immediately
    if (checkFontsLoaded()) {
      clearTimeout(timeoutId);
      return;
    }

    // Wait for fonts to load
    if (typeof document !== 'undefined' && document.fonts) {
      // Use Promise-based approach
      Promise.all([
        document.fonts.ready,
        new Promise<void>((resolve) => {
          const checkInterval = setInterval(() => {
            if (checkFontsLoaded()) {
              clearInterval(checkInterval);
              resolve();
            }
          }, 100);
        })
      ]).then(() => {
        clearTimeout(timeoutId);
      }).catch(() => {
        console.warn('Font loading failed');
        clearTimeout(timeoutId);
        setFontsLoaded(true); // Fallback
      });

      // Also listen for font loading events
      const handleLoadingDone = () => {
        if (checkFontsLoaded()) {
          clearTimeout(timeoutId);
        }
      };

      document.fonts.addEventListener('loadingdone', handleLoadingDone);

      return () => {
        clearTimeout(timeoutId);
        document.fonts?.removeEventListener('loadingdone', handleLoadingDone);
      };
    }

    return () => {
      clearTimeout(timeoutId);
    };
  }, [fonts, timeout, onLoad, onTimeout]);

  return {
    fontsLoaded,
    timeoutReached,
    loadingProgress,
    isLoading: !fontsLoaded
  };
} 