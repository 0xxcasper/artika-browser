'use client';

import { Link } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import styles from './styles.module.scss';

interface AboutProps {
  title: string;
  description: string;
  button: string;
  buttonLink?: string;
}

const variants = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.8, ease: [0.34, 1.56, 0.64, 1] },
  },
};

const viewPort = {
  once: true,
  margin: '0px',
  // amount: 0.3
};

const About = ({ title, description, button, buttonLink }: AboutProps) => {
  return (
    <section className={styles.about}>
      <motion.div
        className={styles.aboutContainer}
        initial="hidden"
        whileInView="visible"
        variants={variants}
        viewport={viewPort}
      >
        <motion.h1
          initial="hidden"
          whileInView="visible"
          variants={variants}
          viewport={viewPort}
        >
          {title}
        </motion.h1>
        <motion.p
          initial="hidden"
          whileInView="visible"
          variants={variants}
          viewport={viewPort}
        >
          {description}
        </motion.p>
        <motion.div
          initial="hidden"
          whileInView="visible"
          variants={variants}
          viewport={viewPort}
        >
          <Link
            href={buttonLink || ''}
            isExternal={!!buttonLink && buttonLink.startsWith('http')}
          >
            <button className={styles.aboutButton}>{button}</button>
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default About;
