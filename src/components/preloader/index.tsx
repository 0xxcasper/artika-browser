'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface PreloaderProps {
  children: React.ReactNode;
  fonts?: string[];
  images?: string[];
  timeout?: number;
}

const Preloader: React.FC<PreloaderProps> = ({ 
  children, 
  fonts = ['Baskervville', 'Raleway'],
  images = [
    '/images/home/banner.jpg',
    '/images/gallery/gallery-bg.jpg',
  ],
  timeout = 5000 
}) => {
  const [assetsLoaded, setAssetsLoaded] = useState(false);
  const hasStarted = useRef(false);
  const timeoutIdRef = useRef<NodeJS.Timeout | null>(null);

  const _updateAssetsLoaded = () => {
    setTimeout(() => {
      setAssetsLoaded(true);
    }, 200);
  }

  useEffect(() => {
    // Prevent multiple executions
    if (hasStarted.current) return;
    hasStarted.current = true;

    const checkAssets = async () => {
      try {
        await Promise.all([
          checkFonts(),
          checkImages()
        ]);

        _updateAssetsLoaded();
      } catch (error) {
        console.log('Asset loading error:', error);
        _updateAssetsLoaded();
      }
    };

    const checkFonts = async (): Promise<void> => {
      if (fonts.length === 0) return;
      
      return new Promise((resolve) => {
        console.log('🔍 Starting font loading check...');
        
        let fontTimeoutId: NodeJS.Timeout | null = null;
        
        // Use document.fonts.ready for reliable font loading
        document.fonts.ready.then(() => {
          console.log('✅ document.fonts.ready resolved');
          
          // Wait a reasonable time for fonts to be fully available
          setTimeout(() => {
            console.log('✅ Fonts loading complete');
            document.body.classList.add('fonts-loaded');
            
            // Clear the fallback timeout
            if (fontTimeoutId) {
              clearTimeout(fontTimeoutId);
            }
            
            resolve();
          }, 1000); // Wait 1 second after fonts.ready
          
        }).catch((error) => {
          console.log('❌ Font loading error:', error);
          resolve(); // Proceed anyway
        });

        // Fallback timeout for fonts
        fontTimeoutId = setTimeout(() => {
          console.log('⚠️ Font loading timeout, proceeding anyway');
          resolve();
        }, 5000); // Reduced to 5 seconds
      });
    };

    const checkImages = async (): Promise<void> => {
      if (images.length === 0) return;

      const imagePromises = images.map(src => {
        return new Promise<boolean>((resolve) => {
          const img = new Image();
          img.onload = () => {
            console.log(`✅ Image loaded: ${src}`);
            resolve(true);
          };
          img.onerror = () => {
            console.log(`❌ Image failed to load: ${src}`);
            resolve(false);
          };
          img.src = src;
        });
      });

      try {
        console.log('Starting image loading');
        const results = await Promise.all(imagePromises);
        const loadedCount = results.filter(r => r).length;
        console.log(`✅ Images loaded: ${loadedCount}/${images.length}`);
      } catch (error) {
        console.log('❌ Image loading error:', error);
      }
    };

    // Start checking assets
    checkAssets();

    // Set timeout as fallback
    timeoutIdRef.current = setTimeout(() => {
      console.log('⏰ Asset loading timeout, proceeding anyway');
      _updateAssetsLoaded();
    }, timeout);

    return () => {
      if (timeoutIdRef.current) {
        clearTimeout(timeoutIdRef.current);
      }
    };
  }, [fonts, images, timeout]);

  return <>
    <AnimatePresence mode="wait">
      {!assetsLoaded ? (
        <motion.div
          key="preloader"
          initial={{ opacity: 1 }}
          exit={{ 
            opacity: 0,
            transition: { duration: 0.3, ease: "easeInOut" }
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
          <motion.img
            style={{
              width: 80,
              height: 80,
            }}
            src="/logo.gif" 
            alt="Artika" 
          />
        </motion.div>
      ) : (
        <motion.div
          key="content"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  </>;
};

export default Preloader; 