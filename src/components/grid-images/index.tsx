'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Image } from '@chakra-ui/react';
import './styles.scss';

export interface GridCard {
  id: number;
  image: string;
  title?: string;
  description?: string;
  hasOverlay?: boolean;
  overlayText?: {
    title: string;
    body: string;
  };
}

export interface GridImagesProps {
  className?: string;
  title?: string;
  cards?: GridCard[];
}

const defaultCards: GridCard[] = [
  {
    id: 1,
    image: '/images/home/news/news-1.jpg',
    hasOverlay: false,
  },
  {
    id: 2,
    image: '/images/home/news/news-2.jpg',
    hasOverlay: true,
    overlayText: {
      title: 'Discover our new menu',
      body: 'Discover our seasonal masterpieces and specialties, with a color palette of dark charcoal, wood tones, and forest greens.',
    },
  },
  {
    id: 3,
    image: '/images/home/news/news-3.jpg',
    hasOverlay: false,
  },
  {
    id: 4,
    image: '/images/home/news/news-4.jpg',
    hasOverlay: false,
  },
  {
    id: 5,
    image: '/images/home/news/news-5.jpg',
    hasOverlay: false,
  },
];

export default function GridImages({
  className = '',
  title = '',
  cards = defaultCards,
}: GridImagesProps) {
  const titleVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' },
    },
  };

  return (
    <section className={`grid-images ${className}`}>
      {title && (
        <motion.h2
          className="grid-images__title"
          variants={titleVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {title}
        </motion.h2>
      )}
      <div className="grid-images__container">
        <div className="grid-images__grid">
          {cards.map((card, index) => (
            <motion.div
              key={card.id}
              className={`grid-images__card ${card.hasOverlay ? 'grid-images__card--overlay' : ''}`}
              variants={{
                hidden: {
                  opacity: 0,
                  y: 30,
                },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: {
                    duration: 0.4,
                    delay: index * 0.05,
                    ease: 'easeOut',
                  },
                },
              }}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-100px' }}
              whileHover={{
                scale: 1.02,
                transition: {
                  type: 'spring',
                  stiffness: 400,
                  damping: 25,
                  mass: 0.5,
                },
              }}
            >
              <div className="grid-images__card-inner">
                <div className="grid-images__image-container">
                  <Image
                    src={card.image}
                    alt={
                      card.overlayText?.title ||
                      `Restaurant interior ${card.id}`
                    }
                    className="grid-images__image"
                    loading="lazy"
                    draggable={false}
                    style={{
                      objectFit: 'cover',
                      objectPosition: 'center',
                    }}
                  />
                </div>

                {card.hasOverlay && card.overlayText && (
                  <div className="grid-images__overlay">
                    <div className="grid-images__overlay-content">
                      <h3 className="grid-images__overlay-title">
                        {card.overlayText.title}
                      </h3>
                      <p className="grid-images__overlay-body">
                        {card.overlayText.body}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
