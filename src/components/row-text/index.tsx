'use client';

import { motion } from 'framer-motion';
import styles from './styles.module.scss';

interface RowTextProps {
  title: string;
  description: string;
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

const RowText = ({ title, description }: RowTextProps) => {
  return (
    <div
      className={styles.rowTextContainer}
      style={{ maxWidth: '1408px', margin: '0 auto' }}
    >
      <motion.h2
        initial="hidden"
        whileInView="visible"
        variants={variants}
        viewport={{ once: true, margin: '100px' }}
      >
        {title}
      </motion.h2>
      <motion.p
        initial="hidden"
        whileInView="visible"
        variants={variants}
        viewport={{ once: true, margin: '100px' }}
      >
        {description}
      </motion.p>
    </div>
  );
};

export default RowText;
