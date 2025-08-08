'use client';

import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import './styles.scss';

// Constants for parallax effect
const PARALLAX_DISTANCE = 32; // 32px per direction = 64px total

export interface SplitBannerSection {
  id: string;
  title: string;
  description: string;
  ctaText: string;
  ctaLink?: string;
  image: string;
  imageAlt: string;
  textFirst?: boolean;
}
interface SplitBannerProps {
  sections: Array<SplitBannerSection>;
  onCtaClick?: (sectionId: string) => void;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.8,
      ease: [0.34, 1.56, 0.64, 1],
      staggerChildren: 0.3,
      delayChildren: 0.2,
    },
  },
};

const sectionVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 1,
      ease: [0.34, 1.56, 0.64, 1],
      staggerChildren: 0.2,
    },
  },
};

const textVariants = {
  hidden: { opacity: 0, x: -60 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.8,
      ease: [0.34, 1.56, 0.64, 1],
    },
  },
};

const imageVariants = {
  hidden: { opacity: 0, scale: 1.1, x: 60 },
  visible: {
    opacity: 1,
    scale: 1,
    x: 0,
    transition: {
      duration: 1.2,
      ease: [0.34, 1.56, 0.64, 1],
    },
  },
};

const titleVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.34, 1.56, 0.64, 1],
      delay: 0.1,
    },
  },
};

const descriptionVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.34, 1.56, 0.64, 1],
      delay: 0.2,
    },
  },
};

const buttonVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.9 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: [0.34, 1.56, 0.64, 1],
      delay: 0.3,
    },
  },
};

export default function SplitBanner({
  sections,
  onCtaClick,
}: SplitBannerProps) {
  const [hoveredImage, setHoveredImage] = useState<string | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const imageRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  const handleCtaClick = (sectionId: string) => {
    if (onCtaClick) {
      onCtaClick(sectionId);
    }
  };

  const handleImageMouseMove = (
    sectionId: string,
    event: React.MouseEvent<HTMLDivElement>,
  ) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width - 0.5) * 2; // -1 to 1
    const y = ((event.clientY - rect.top) / rect.height - 0.5) * 2; // -1 to 1

    console.log('Mouse move:', { sectionId, x, y, mousePosition: { x, y } });
    setMousePosition({ x, y });
    setHoveredImage(sectionId);
  };

  const handleImageMouseLeave = () => {
    setHoveredImage(null);
    setMousePosition({ x: 0, y: 0 });
  };

  return (
    <motion.div
      className="split-banner"
      initial="hidden"
      whileInView="visible"
      variants={containerVariants}
      viewport={{ once: true, margin: '-50px' }}
    >
      {sections.map((section) => (
        <motion.div
          key={section.id}
          className="banner-section"
          variants={sectionVariants}
        >
          {/* Desktop Layout */}
          <div className="desktop-layout">
            <div
              className={`content-wrapper ${section.textFirst ? 'text-first' : 'image-first'}`}
            >
              {/* Text Content */}
              <motion.div className="text-content" variants={textVariants}>
                <motion.h2 className="section-title" variants={titleVariants}>
                  {section.title}
                </motion.h2>
                <motion.p
                  className="section-description"
                  variants={descriptionVariants}
                >
                  {section.description}
                </motion.p>
                <motion.button
                  className="cta-button underline-animate"
                  variants={buttonVariants}
                  whileHover={{
                    y: -2,
                    opacity: 0.8,
                    transition: { duration: 0.2, ease: 'easeInOut' },
                  }}
                  whileTap={{
                    scale: 0.95,
                    y: -2,
                    transition: { duration: 0.2, ease: 'easeInOut' },
                  }}
                  onClick={() => {
                    if (section.ctaLink) {
                      window.open(section.ctaLink, '_blank');
                    } else {
                      handleCtaClick(section.id);
                    }
                  }}
                >
                  {section.ctaText}
                </motion.button>
              </motion.div>

              {/* Image Content */}
              <motion.div
                className="image-content"
                ref={(el) => {
                  imageRefs.current[section.id] = el;
                }}
                onMouseMove={(e) => handleImageMouseMove(section.id, e)}
                onMouseLeave={handleImageMouseLeave}
                initial="hidden"
                whileInView="visible"
                variants={imageVariants}
                viewport={{ once: true }}
              >
                <motion.div
                  className="image-wrapper"
                  animate={{
                    x:
                      hoveredImage === section.id
                        ? mousePosition.x * PARALLAX_DISTANCE
                        : 0,
                    y:
                      hoveredImage === section.id
                        ? mousePosition.y * PARALLAX_DISTANCE
                        : 0,
                  }}
                  transition={{ duration: 0.3, ease: 'easeOut' }}
                  viewport={{ once: true }}
                >
                  <img
                    src={section.image}
                    alt={section.imageAlt}
                    className="section-image"
                  />
                </motion.div>
              </motion.div>
            </div>
          </div>
          {/* Mobile Layout */}
          <div className="mobile-layout">
            <motion.h2 className="mobile-text-title" variants={titleVariants}>
              {section.title}
            </motion.h2>
            <motion.p
              className="mobile-text-description"
              variants={descriptionVariants}
            >
              {section.description}
            </motion.p>
            <motion.button
              className="mobile-cta-button"
              onClick={() => {
                if (section.ctaLink) {
                  window.open(section.ctaLink, '_blank');
                } else {
                  handleCtaClick(section.id);
                }
              }}
            >
              {section.ctaText}
            </motion.button>

            <motion.div
              className="mobile-image-wrapper"
              variants={imageVariants}
            >
              <img
                src={section.image}
                alt={section.imageAlt}
                className="section-image"
              />
            </motion.div>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
}
