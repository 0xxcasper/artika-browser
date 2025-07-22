'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import './styles.scss';

interface ImageLoaderProps {
  src: string;
  alt?: string;
  className?: string;
  onLoad?: () => void;
  children?: React.ReactNode;
  priority?: boolean;
  fill?: boolean;
  width?: number;
  height?: number;
  sizes?: string;
  quality?: number;
}

export default function ImageLoader({ 
  src, 
  alt = '', 
  className = '', 
  onLoad,
  children,
  priority = false,
  fill = false,
  width,
  height,
  sizes = '100vw',
  quality = 90
}: ImageLoaderProps) {
  const [isLoaded, setIsLoaded] = useState(false);

  const handleLoad = () => {
    setIsLoaded(true);
    onLoad?.();
  };

  const imageProps = {
    src,
    alt,
    onLoad: handleLoad,
    priority,
    quality,
    sizes,
    style: {
      objectFit: 'cover' as const,
      objectPosition: 'center' as const
    }
  };

  return (
    <div className={`image-loader ${className}`}>
      {!isLoaded && (
        <motion.div
          className="image-loader-placeholder"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="loading-spinner" />
        </motion.div>
      )}
      
      <motion.div
        className="image-loader-content"
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoaded ? 1 : 0 }}
        transition={{ duration: 0.5 }}
      >
        {fill ? (
          <Image
            {...imageProps}
            fill
          />
        ) : (
          <Image
            {...imageProps}
            width={width || 800}
            height={height || 600}
          />
        )}
        {children}
      </motion.div>
    </div>
  );
} 