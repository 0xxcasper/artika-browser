'use client';

import React from 'react';
import styles from './styles.module.scss';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';

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

export default function Map({
  title,
  description,
  linkHref,
  linkLabel = 'Tải bản đồ ở đây',
  image,
  alt = 'map',
  maxScale = 3,
  minScale = 0.6,
  initialScale = 1,
}: MapProps) {
  return (
    <section className={styles.mapSection}>
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
    </section>
  );
}
