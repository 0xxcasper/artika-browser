'use client';

import React from 'react';
import styles from './styles.module.scss';
import { motion } from 'framer-motion';

export interface PrepareItem {
  description: string;
  image: string; // icon or image url
}

interface PrepareProps {
  title: string;
  items: Array<PrepareItem>;
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

const itemVariants = (index: number) => ({
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 1,
      ease: [0.34, 1.56, 0.64, 1],
      delay: index * 0.2,
    },
  },
});

const viewPort = {
  once: true,
  margin: '0px',
};

export default function Prepare({ title, items }: PrepareProps) {
  if (!title && (!items || items.length === 0)) return null;

  return (
    <section className={styles.prepareSection}>
      {title ? (
        <motion.h2
          initial="hidden"
          whileInView="visible"
          variants={variants}
          viewport={viewPort}
          className={styles.title}
        >
          {title}
        </motion.h2>
      ) : null}

      <div className={styles.grid}>
        {items?.map((item, index) => (
          <motion.div
            key={`prepare-item-${index}`}
            className={styles.card}
            initial="hidden"
            whileInView="visible"
            variants={itemVariants(index)}
            viewport={viewPort}
          >
            {item.image ? (
              <div className={styles.iconWrapper}>
                <img
                  src={item.image}
                  alt="prepare item"
                  className={styles.icon}
                  loading="lazy"
                />
              </div>
            ) : null}
            <p className={styles.description}>{item.description}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
