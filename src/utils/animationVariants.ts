import type { Variants } from 'framer-motion';

// Shared easing curve used across the project
const EASE_SPRING = [0.34, 1.56, 0.64, 1];

// Common viewport settings
export const defaultViewport = {
  once: true,
  margin: '0px',
};

export const offsetViewport = {
  once: true,
  margin: '-50px',
};

export const deepOffsetViewport = {
  once: true,
  margin: '-100px',
};

// Fade in + move up — used in about, prepare, hero text
export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.8, ease: EASE_SPRING },
  },
};

// Fade in + move up (light version, no scale) — used in focus-banner, grid-images title
export const fadeInUpLight: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' },
  },
};

// Stagger container — wraps children with sequential reveals
export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.8,
      ease: EASE_SPRING,
      staggerChildren: 0.3,
      delayChildren: 0.2,
    },
  },
};

// Section that fades up with its own stagger for children
export const staggerSection: Variants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 1,
      ease: EASE_SPRING,
      staggerChildren: 0.2,
    },
  },
};

// Slide in from left — used in split-banner text
export const slideInLeft: Variants = {
  hidden: { opacity: 0, x: -60 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.8, ease: EASE_SPRING },
  },
};

// Slide in from right with scale — used in split-banner image
export const slideInRight: Variants = {
  hidden: { opacity: 0, scale: 1.1, x: 60 },
  visible: {
    opacity: 1,
    scale: 1,
    x: 0,
    transition: { duration: 1.2, ease: EASE_SPRING },
  },
};

// Title variant with small delay
export const titleReveal: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: EASE_SPRING, delay: 0.1 },
  },
};

// Description variant with slightly more delay
export const descriptionReveal: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: EASE_SPRING, delay: 0.2 },
  },
};

// Button variant — pops in last
export const buttonReveal: Variants = {
  hidden: { opacity: 0, y: 20, scale: 0.9 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.6, ease: EASE_SPRING, delay: 0.3 },
  },
};

// Staggered item factory — for lists where each item delays by index
export const staggeredItem = (index: number): Variants => ({
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 1,
      ease: EASE_SPRING,
      delay: index * 0.2,
    },
  },
});

// Simple fade in — used in grid-images cards
export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.4, ease: 'easeOut' },
  },
};

// Hover effects
export const hoverScale = {
  scale: 1.05,
  transition: { duration: 0.3, ease: 'easeInOut' as const },
};

export const tapScale = {
  scale: 0.95,
  opacity: 0.8,
  transition: { duration: 0.3, ease: 'easeInOut' as const },
};

export const hoverSpring = {
  scale: 1.02,
  transition: {
    type: 'spring' as const,
    stiffness: 400,
    damping: 25,
    mass: 0.5,
  },
};
