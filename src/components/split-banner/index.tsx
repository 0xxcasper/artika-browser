'use client';

import { motion } from 'framer-motion';
import React, { useRef, useState } from 'react';
import {
  staggerContainer,
  staggerSection,
  slideInLeft,
  slideInRight,
  titleReveal,
  descriptionReveal,
  buttonReveal,
  offsetViewport,
  hoverScale,
  tapScale,
} from '@/utils/animationVariants';
import './styles.scss';

// Constants for parallax effect
const PARALLAX_DISTANCE = 60; // 60px per direction = 120px total

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
  unAcceptPaddingMb?: boolean;
}

export default function SplitBanner({
  sections,
  onCtaClick,
  unAcceptPaddingMb = false,
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

    setMousePosition({ x, y });
    setHoveredImage(sectionId);
  };

  const handleImageMouseLeave = () => {
    setHoveredImage(null);
    setMousePosition({ x: 0, y: 0 });
  };

  return (
    <motion.div
      className={`split-banner ${unAcceptPaddingMb ? 'un-accept-padding-mb' : ''}`}
      initial="hidden"
      whileInView="visible"
      variants={staggerContainer}
      viewport={offsetViewport}
    >
      {sections.map((section) => (
        <motion.div
          key={section.id}
          className="banner-section"
          variants={staggerSection}
        >
          {/* Desktop Layout */}
          <div className="desktop-layout">
            <div
              className={`content-wrapper ${section.textFirst ? 'text-first' : 'image-first'}`}
            >
              {/* Text Content */}
              <motion.div className="text-content" variants={slideInLeft}>
                {section.title && (
                  <motion.h2 className="section-title" variants={titleReveal}>
                    {section.title}
                  </motion.h2>
                )}
                <motion.p
                  className="section-description"
                  variants={descriptionReveal}
                >
                  {section.description}
                </motion.p>
                <motion.button
                  className="cta-button"
                  variants={buttonReveal}
                  whileHover={hoverScale}
                  whileTap={tapScale}
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
                variants={slideInRight}
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
            <motion.h2 className="mobile-text-title" variants={titleReveal}>
              {section.title}
            </motion.h2>
            <motion.p
              className="mobile-text-description"
              variants={descriptionReveal}
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
              variants={slideInRight}
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
