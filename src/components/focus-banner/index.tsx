'use client';

import React from 'react';
import { motion } from 'framer-motion';
import './styles.scss';
import Button from '../button';
// import { Image } from '@chakra-ui/react';

interface FocusBannerProps {
  title?: string;
  description?: string;
  buttonText?: string;
  buttonLink?: string;
  backgroundImage?: string;
  onExploreClick?: () => void;
  aspectRatio?: string;
}

const textVariants = {
  hidden: { 
    opacity: 0, 
    y: 30
  },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { 
      duration: 0.6, 
      ease: "easeOut"
    } 
  }
};

export default function FocusBanner({
  title = "Nourish to flourish.",
  description = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  buttonText = "Explore",
  buttonLink,
  backgroundImage = "/assets/images/meditation-bg.jpg",
  onExploreClick,
  aspectRatio = "1728/720"
}: FocusBannerProps) {

  return (
    <div className="focus-banner">
      <img 
        className="banner-background" 
        src={backgroundImage} 
        alt="Focus Banner"
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          aspectRatio: aspectRatio
        }}
      />

      <div className="banner-overlay">
          <div className="banner-content">
            <motion.h1 
              className="banner-title"
              variants={textVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
            >
              {title}
            </motion.h1>
            
            <motion.p 
              className="banner-description"
              variants={textVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
            >
              {description}
            </motion.p>
            
          <motion.div 
            variants={textVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
          >
            <Button 
              href={buttonLink}
              onClick={onExploreClick} 
              variant="secondary" 
              whileHover={{ scale: 1.05 }} 
              whileTap={{ scale: 0.95 }} 
              style={{ padding: '0.75rem 3.8125rem' }}
            >
              {buttonText}
            </Button>
          </motion.div>
        </div>
      </div>
    </div>
  );
}