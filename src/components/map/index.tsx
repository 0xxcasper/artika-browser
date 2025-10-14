'use client';

import React from 'react';
import styles from './styles.module.scss';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';
import { motion } from 'framer-motion';

interface MapProps {
  title?: string;
  description?: string;
  linkHref?: string;
  linkLabel?: string;
  image: string;
  alt?: string;
  maxScale?: number;
  minScale?: number;
  initialScale?: number;
}

const initProps: MapProps = {
  maxScale: 3,
  minScale: 0.6,
  initialScale: 1,
  linkHref: '',
  linkLabel: 'Tải bản đồ ở đây',
  image: '',
  alt: 'map',
};

const variants = {
  hidden: { opacity: 0, y: 40, scale: 0.8 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    damping: 10,
    stiffness: 100,
    mass: 0.8,
    transition: { duration: 0.8, ease: [0.34, 1.56, 0.64, 1] },
  },
};

const viewPort = {
  once: true,
  margin: '0px',
};

const Map = ({ ...props }: MapProps) => {
  const {
    title,
    description,
    linkHref,
    linkLabel,
    image,
    alt,
    maxScale,
    minScale,
    initialScale,
  } = { ...initProps, ...props };

  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      variants={variants}
      viewport={viewPort}
      className={styles.mapSection}
    >
      {title ? <h2 className={styles.title}>{title}</h2> : null}
      {description ? <p className={styles.description}>{description}</p> : null}
      {linkHref ? (
        <a
          className={styles.downloadLink}
          href={linkHref}
          target="_blank"
          rel="noreferrer"
        >
          {linkLabel}
        </a>
      ) : null}

      <div className={styles.viewer}>
        <TransformWrapper
          initialScale={initialScale}
          minScale={minScale}
          maxScale={maxScale}
          wheel={{ disabled: true }}
          doubleClick={{ disabled: true }}
        >
          {({ zoomIn, zoomOut, resetTransform, centerView }) => (
            <>
              <div className={styles.toolbar}>
                <button aria-label="Zoom out" onClick={() => zoomOut()}>
                  -
                </button>
                <button aria-label="Zoom in" onClick={() => zoomIn()}>
                  +
                </button>
                <div className={styles.divider} />
                <button aria-label="Reset" onClick={() => resetTransform()}>
                  Reset
                </button>
                <button aria-label="Center" onClick={() => centerView()}>
                  Center
                </button>
              </div>

              <TransformComponent>
                <img
                  className={styles.image}
                  src={image}
                  alt={alt}
                  draggable={false}
                />
              </TransformComponent>
            </>
          )}
        </TransformWrapper>
      </div>
    </motion.section>
  );
};

export default Map;
