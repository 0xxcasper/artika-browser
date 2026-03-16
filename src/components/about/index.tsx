'use client';

import { Link } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { fadeInUp, defaultViewport } from '@/utils/animationVariants';
import styles from './styles.module.scss';

interface AboutProps {
  title: string;
  description: string;
  button: string;
  buttonLink?: string;
  unAcceptPaddingMb?: boolean;
  type?: 'section' | 'header';
}

const About = ({
  title,
  description,
  button,
  buttonLink,
  unAcceptPaddingMb = false,
  type = 'section',
}: AboutProps) => {
  return (
    <section className={styles.about}>
      <motion.div
        className={`
          ${styles.aboutContainer} 
          ${unAcceptPaddingMb ? styles.aboutContainer__unAcceptPaddingMb : ''} 
          ${
            type === 'header'
              ? styles.aboutContainer__header
              : styles.aboutContainer__section
          }`}
        initial="hidden"
        whileInView="visible"
        variants={fadeInUp}
        viewport={defaultViewport}
      >
        <motion.h1
          initial="hidden"
          whileInView="visible"
          variants={fadeInUp}
          viewport={defaultViewport}
        >
          {title}
        </motion.h1>
        <motion.p
          initial="hidden"
          whileInView="visible"
          variants={fadeInUp}
          viewport={defaultViewport}
        >
          {description}
        </motion.p>
        {!!button && (
          <motion.div
            initial="hidden"
            whileInView="visible"
            variants={fadeInUp}
            viewport={defaultViewport}
          >
            <Link
              href={buttonLink || ''}
              isExternal={!!buttonLink && buttonLink.startsWith('http')}
            >
              <button className={styles.aboutButton}>{button}</button>
            </Link>
          </motion.div>
        )}
      </motion.div>
    </section>
  );
};

export default About;
