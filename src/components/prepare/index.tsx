'use client';

import React from 'react';
import styles from './styles.module.scss';
import { motion } from 'framer-motion';
import {
  fadeInUp,
  staggeredItem,
  defaultViewport,
} from '@/utils/animationVariants';

export interface PrepareItem {
  description: string;
  image: string; // icon or image url
}

interface PrepareProps {
  title: string;
  items: Array<PrepareItem>;
}

export default function Prepare({ title, items }: PrepareProps) {
  if (!title && (!items || items.length === 0)) return null;

  return (
    <section className={styles.prepareSection}>
      {title ? (
        <motion.h2
          initial="hidden"
          whileInView="visible"
          variants={fadeInUp}
          viewport={defaultViewport}
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
            variants={staggeredItem(index)}
            viewport={defaultViewport}
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
