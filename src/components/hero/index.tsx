'use client';

import { Image } from '@chakra-ui/react';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import { useRef } from 'react';
import styles from './styles.module.scss';

interface HeroProps {
  title: string;
  subtitle: string;
  backgroundImage: string;
}

export default function Hero({ title, subtitle, backgroundImage }: HeroProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  // Track scroll progress relative to the hero component
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  // Raw transform values
  const scaleRaw = useTransform(scrollYProgress, [0, 1], [1.1, 1.6]);
  const yRaw = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const rotateXRaw = useTransform(scrollYProgress, [0, 1], [0, 15]);
  const rotateYRaw = useTransform(scrollYProgress, [0, 1], [0, -8]);
  const rotateZRaw = useTransform(scrollYProgress, [0, 1], [0, 2]);

  // Apply spring physics for smooth animations
  const springConfig = {
    stiffness: 100,
    damping: 30,
    mass: 0.8,
  };

  const scale = useSpring(scaleRaw, springConfig);
  const y = useSpring(yRaw, springConfig);
  const rotateX = useSpring(rotateXRaw, springConfig);
  const rotateY = useSpring(rotateYRaw, springConfig);
  const rotateZ = useSpring(rotateZRaw, springConfig);

  const containerVariants = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        duration: 1,
      },
    },
  };

  const backgroundVariants = {
    hidden: {
      scale: 1.1,
      opacity: 0,
    },
    visible: {
      scale: 1.1,
      opacity: 1,
      transition: {
        duration: 1.2,
        ease: 'easeOut',
      },
    },
  };

  const textVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: 'easeOut',
      },
    },
  };

  return (
    <motion.div
      ref={containerRef}
      className={styles.hero}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Background Image with Smooth Scroll Transforms */}
      <motion.div
        className={styles.heroBackground}
        variants={backgroundVariants}
        initial="hidden"
        animate="visible"
        style={{
          scale,
          y,
          rotateX,
          rotateY,
          rotateZ,
          willChange: 'transform',
          transformStyle: 'preserve-3d',
          backfaceVisibility: 'hidden',
          WebkitBackfaceVisibility: 'hidden',
        }}
      >
        <Image
          src={backgroundImage}
          alt="Hero background"
          width="100%"
          height="100%"
          objectFit="cover"
          objectPosition="center"
          loading="eager"
          style={{
            width: '100%',
            height: '100%',
            minWidth: '100%',
            minHeight: '100%',
            transform: 'translate3d(0, 0, 0)',
          }}
        />
      </motion.div>

      {/* Overlay */}

      {/* Hero Content with Sequential Animations */}
      <motion.div
        className={styles.heroContent}
        initial="hidden"
        animate="visible"
      >
        <motion.h1
          variants={textVariants}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.2 }}
          style={{ whiteSpace: 'pre-line' }}
        >
          {title}
        </motion.h1>
        <motion.p
          variants={textVariants}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.4 }}
          style={{ whiteSpace: 'pre-line' }}
        >
          {subtitle}
        </motion.p>
      </motion.div>
      <motion.img
        variants={textVariants}
        initial="hidden"
        animate="visible"
        transition={{ delay: 0.4 }}
        src="/logo.svg"
        alt="Logo"
        width={'48px'}
        height={'48px'}
        className={styles.heroLogo}
        draggable={false}
      ></motion.img>
    </motion.div>
  );
}
