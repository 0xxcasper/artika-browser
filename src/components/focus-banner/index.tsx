'use client';

import React from 'react';
import { motion } from 'framer-motion';
import './styles.scss';
import Button from '../button';
import { Image } from '@chakra-ui/react';

interface FocusBannerProps {
  title?: string;
  description?: string;
  buttonText?: string;
  backgroundImage?: string;
  onExploreClick?: () => void;
  aspectRatio?: string;
}

const variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { 
      duration: 0.8, 
      ease: [0.34, 1.56, 0.64, 1],
      staggerChildren: 0.2
    } 
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { 
      duration: 0.6, 
      ease: [0.34, 1.56, 0.64, 1] 
    } 
  }
};

export default function FocusBanner({
  title = "Nourish to flourish.",
  description = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  buttonText = "Explore",
  backgroundImage = "/assets/images/meditation-bg.jpg",
  onExploreClick,
  aspectRatio = "1728/720"
}: FocusBannerProps) {

  return (
    <motion.div 
      className="focus-banner"
      initial="hidden"
      whileInView="visible"
      variants={variants}
      viewport={{ once: true, margin: "-10% 0px" }}
    >
      <Image className="banner-background" src={backgroundImage} alt="Focus Banner" objectFit="cover" aspectRatio={aspectRatio} />

      <div className="banner-overlay">
          <div className="banner-content">
            <motion.h1 
              className="banner-title"
              variants={itemVariants}
            >
              {title}
            </motion.h1>
            
            <motion.p 
              className="banner-description"
              variants={itemVariants}
            >
              {description}
            </motion.p>
            
            <Button onClick={onExploreClick} variant="secondary" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} style={{ padding: '0.75rem 3.8125rem' }}>
              {buttonText}
            </Button>
          </div>
        </div>
    </motion.div>
  );
}