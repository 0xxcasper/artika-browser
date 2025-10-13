'use client';

import React from 'react';
import styles from './styles.module.scss';

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
      {title ? <h2 className={styles.title}>{title}</h2> : null}

      <div className={styles.grid}>
        {items?.map((item, index) => (
          <div key={`prepare-item-${index}`} className={styles.card}>
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
          </div>
        ))}
      </div>
    </section>
  );
}
