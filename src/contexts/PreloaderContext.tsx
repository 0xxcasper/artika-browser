'use client';

import { useNavigation } from '@/hooks/useNavigation';
import {
  FooterData,
  NavigationCTA,
  NavigationMenu,
  NewsletterFormData,
} from '@/locales/types';
import { Box } from '@chakra-ui/react';
import { AnimatePresence, motion } from 'framer-motion';
import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

interface PreloaderContextType {
  menus: NavigationMenu[];
  cta: NavigationCTA;
  newsletterForm: NewsletterFormData;
  footerData: FooterData;
}

const PreloaderContext = createContext<PreloaderContextType | undefined>(
  undefined,
);

interface PreloaderProviderProps {
  children: React.ReactNode;
  fonts?: string[];
  images?: string[];
  timeout?: number;
}

// Helper function to detect mobile devices
const isMobile = () => {
  if (typeof window === 'undefined') return false;
  return (
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent,
    ) || window.innerWidth <= 768
  );
};

export const usePreloader = () => {
  const context = useContext(PreloaderContext);
  if (context === undefined) {
    throw new Error('usePreloader must be used within a PreloaderProvider');
  }
  return context;
};

export const PreloaderProvider: React.FC<PreloaderProviderProps> = ({
  children,
  fonts = ['Playfair'],
  images = [],
  timeout = 5000,
}) => {
  const [assetsLoaded, setAssetsLoaded] = useState(false);
  const [isMobileDevice, setIsMobileDevice] = useState(false);
  const [_, setVideoLoaded] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const hasStarted = useRef(false);
  const timeoutIdRef = useRef<NodeJS.Timeout | null>(null);
  const { menus, cta, newsletterForm, footerData } = useNavigation();

  const _updateAssetsLoaded = () => {
    setTimeout(() => {
      setAssetsLoaded(true);
    }, 200);
  };

  useEffect(() => {
    // Detect mobile device
    setIsMobileDevice(isMobile());
  }, []);

  // Handle video loading and autoplay on mobile
  useEffect(() => {
    if (!videoRef.current) return;

    const video = videoRef.current;

    const handleCanPlay = () => {
      setVideoLoaded(true);

      // Force play on mobile
      if (isMobileDevice) {
        const playPromise = video.play();
        if (playPromise !== undefined) {
          playPromise.catch(() => {
            // Fallback: try to play on user interaction
            const handleUserInteraction = () => {
              video.play().catch(console.error);
              document.removeEventListener('touchstart', handleUserInteraction);
              document.removeEventListener('click', handleUserInteraction);
            };
            document.addEventListener('touchstart', handleUserInteraction);
            document.addEventListener('click', handleUserInteraction);
          });
        }
      }
    };

    const handleLoadStart = () => {};

    const handleLoadedData = () => {};

    const handleError = (e: Event) => {
      console.error('Video error:', e);
    };

    video.addEventListener('canplay', handleCanPlay);
    video.addEventListener('loadstart', handleLoadStart);
    video.addEventListener('loadeddata', handleLoadedData);
    video.addEventListener('error', handleError);

    return () => {
      video.removeEventListener('canplay', handleCanPlay);
      video.removeEventListener('loadstart', handleLoadStart);
      video.removeEventListener('loadeddata', handleLoadedData);
      video.removeEventListener('error', handleError);
    };
  }, [isMobileDevice]);

  useEffect(() => {
    // Prevent multiple executions
    if (hasStarted.current) return;
    hasStarted.current = true;

    const checkAssets = async () => {
      try {
        await Promise.all([checkFonts(), checkImages()]);

        _updateAssetsLoaded();
      } catch (error) {
        _updateAssetsLoaded();
      }
    };

    const checkFonts = async (): Promise<void> => {
      if (fonts.length === 0) return;

      return new Promise((resolve) => {
        let fontTimeoutId: NodeJS.Timeout | null = null;

        // Use document.fonts.ready for reliable font loading
        document.fonts.ready
          .then(() => {
            // Wait a reasonable time for fonts to be fully available
            setTimeout(() => {
              document.body.classList.add('fonts-loaded');

              // Clear the fallback timeout
              if (fontTimeoutId) {
                clearTimeout(fontTimeoutId);
              }

              resolve();
            }, 1000); // Wait 1 second after fonts.ready
          })
          .catch(() => {
            resolve(); // Proceed anyway
          });

        // Fallback timeout for fonts
        fontTimeoutId = setTimeout(() => {
          resolve();
        }, 5000); // Reduced to 5 seconds
      });
    };

    const checkImages = async (): Promise<void> => {
      if (images.length === 0) return;

      const imagePromises = images.map((src) => {
        return new Promise<boolean>((resolve) => {
          const img = new Image();
          img.onload = () => {
            resolve(true);
          };
          img.onerror = () => {
            resolve(false);
          };
          img.src = src;
        });
      });

      try {
        await Promise.all(imagePromises);
      } catch (error) {
        // Image loading failed, proceed anyway
      }
    };

    // Start checking assets
    checkAssets();

    // Set timeout as fallback
    timeoutIdRef.current = setTimeout(() => {
      _updateAssetsLoaded();
    }, timeout);

    return () => {
      if (timeoutIdRef.current) {
        clearTimeout(timeoutIdRef.current);
      }
    };
  }, [fonts, images, timeout]);

  const isLoaded = useMemo(() => {
    return menus?.length > 0 && assetsLoaded;
  }, [menus, assetsLoaded]);

  const contextValue: PreloaderContextType = useMemo(
    () => ({
      menus,
      cta,
      newsletterForm,
      footerData,
    }),
    [menus, cta, newsletterForm, footerData],
  );

  return (
    <PreloaderContext.Provider value={contextValue}>
      <AnimatePresence mode="wait">
        {!isLoaded ? (
          <motion.div
            key="preloader"
            initial={{ opacity: 1 }}
            exit={{
              opacity: 0,
              transition: {
                duration: 0.3,
                ease: 'easeInOut',
              },
            }}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 9999,
            }}
          >
            <motion.div
              style={{ width: 147, height: 147, position: 'relative' }}
            >
              <video
                ref={videoRef}
                width={145}
                height={145}
                autoPlay
                loop
                muted
                playsInline
                preload="auto"
                style={{
                  // display: 'block',
                  width: '100%',
                  height: '100%',
                  objectFit: 'contain',
                }}
                aria-label="Artika"
              >
                <source src="/logo-anim.mp4" type="video/mp4" />
              </video>
              <Box
                position="absolute"
                left={0}
                right={0}
                bottom="-1px"
                height="5px"
                width="100%"
                margin="auto"
                backgroundColor="#fff"
              />
              <Box
                position="absolute"
                top={0}
                bottom={0}
                right={0}
                height="100%"
                width="5px"
                margin="auto"
                backgroundColor="#fff"
              />
            </motion.div>
          </motion.div>
        ) : (
          <motion.div
            key="content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </PreloaderContext.Provider>
  );
};
