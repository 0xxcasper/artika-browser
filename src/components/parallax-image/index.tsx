'use client';

import { Image } from '@chakra-ui/react';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import { useRef } from 'react';
import styles from './styles.module.scss';

interface ParallaxImageProps {
  src: string;
  alt: string;
  width?: string;
  height?: string;
}

export default function ParallaxImage({ 
  src, 
  alt, 
  width = "100%", 
  height = "auto" 
}: ParallaxImageProps) {
  // Parallax effect for image
  const imageRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const rotateX = useTransform(mouseY, [-300, 300], [15, -15]);
  const rotateY = useTransform(mouseX, [-300, 300], [-15, 15]);
  const scale = useTransform(mouseX, [-300, 300], [0.95, 1.05]);

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (imageRef.current) {
      const rect = imageRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      mouseX.set(event.clientX - centerX);
      mouseY.set(event.clientY - centerY);
    }
  };

  // Keep current position when mouse leaves (no reset)
  // const handleMouseLeave = () => {
  //   mouseX.set(0);
  //   mouseY.set(0);
  // };

  return (
    <motion.div
      ref={imageRef}
      onMouseMove={handleMouseMove}
      style={{
        perspective: 1000,
        transformStyle: 'preserve-3d',
      }}
      className={styles.parallaxContainer}
    >
      <motion.div
        style={{
          rotateX,
          rotateY,
          scale,
          transformStyle: 'preserve-3d',
        }}
        transition={{ duration: 0.1, ease: 'easeOut' }}
      >
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          className={styles.parallaxImage}
        />
      </motion.div>
    </motion.div>
  );
}
