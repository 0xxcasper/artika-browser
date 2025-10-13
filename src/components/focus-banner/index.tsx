'use client';

import { motion } from 'framer-motion';
import Button from '../button';
import styles from './styles.module.scss';

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
    y: 30,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: 'easeOut',
    },
  },
};

export default function FocusBanner({
  title = 'Nourish to flourish.',
  description = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  buttonText = 'Explore',
  buttonLink,
  backgroundImage = '/assets/images/meditation-bg.jpg',
  onExploreClick,
  aspectRatio = '1728/720',
}: FocusBannerProps) {
  return (
    <div className={styles.focusBanner}>
      <img
        className={styles.bannerBackground}
        src={backgroundImage}
        alt="Focus Banner"
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          // aspectRatio: aspectRatio,
        }}
      />

      <div className={styles.bannerOverlay}>
        <div className={styles.bannerContent}>
          <motion.h1
            className={styles.bannerTitle}
            variants={textVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
          >
            {title}
          </motion.h1>

          <motion.p
            className={styles.bannerDescription}
            variants={textVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
          >
            {description}
          </motion.p>

          {buttonText && (
            <motion.div
              variants={textVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-50px' }}
            >
              <Button
                href={buttonLink}
                onClick={onExploreClick}
                variant="secondary"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {buttonText}
              </Button>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
