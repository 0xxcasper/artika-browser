'use client';

import './styles.scss'; 
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Image } from '@chakra-ui/react';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import HorizontalList from '@/components/horizontal-list';
import type { ArtwalkContent } from '@/types/artwalk';

const MAX_LENGTH = 3000;

interface GalleryDetailPageProps {
  contentData: ArtwalkContent | null;
  slug: string;
  id: string;
  lang: string;
}

function GalleryDetail({ text }: { text: string }) {
  const [expanded, setExpanded] = useState(false);
  const showReadMore = text.length > MAX_LENGTH;

  const displayText = expanded || !showReadMore
    ? text
    : text.slice(0, MAX_LENGTH) + '...';

  return (
    <div className="description">
        <motion.p
          key={expanded ? 'expanded' : 'collapsed'}
          className={`description__text${expanded ? ' expanded' : ''}`}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0, transition: { duration: 0.5, delay: 0.8, ease: 'easeInOut' } }}
          exit={{ opacity: 0, y: 30 }}
          style={{ overflow: 'hidden' }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
        >
          {displayText}
        </motion.p>
      {showReadMore && (
        <button className="read-more-btn" onClick={() => setExpanded((v) => !v)}>
          {expanded ? 'Show less' : 'Read more'}
        </button>
      )}
    </div>
  );
}

const GalleryDetailPage = ({ contentData, lang }: GalleryDetailPageProps) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: false,
    autoplaySpeed: 5000,
    pauseOnHover: true
  };

  // Get content info from Prismic data
  const banners = contentData?.detail?.images ?? [];
  const title = contentData?.detail?.title || '';
  const author = contentData?.detail?.author || '';
  const info = contentData?.detail?.info || '';
  const description = contentData?.detail?.description || '';

  return (
    <div className="gallery-detail-container">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: 'easeOut' }}
      >
        <Slider {...settings}>
          {(banners?.length === 1 ? [...banners, ...banners] : banners).map((banner, index) => (
            <div key={index}>
              <Image 
                src={banner}
                alt="banner" 
                style={{
                  width: '100%',
                  height: 'auto',
                  objectFit: 'cover',
                  objectPosition: 'center',
                }}
                aspectRatio={{
                  base: "1568/730",
                }}
                draggable={false}
              />
            </div>
          ))}
        </Slider>
      </motion.div>
      <motion.div
        className="content"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5, ease: 'easeOut' }}
      >
        <motion.div
          className="info"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5, ease: 'easeOut' }}
        >
          <p className="name">{title}</p>
          <p className="material">{info}</p>
          <p className="author">{author}</p>
        </motion.div>
        <GalleryDetail text={description} />
      </motion.div>
      <HorizontalList 
        otherProjects={contentData?.otherProjects}
        currentProjectId={contentData?.id}
        title="OTHER PROJECTS"
        locale={lang}
      />
    </div>
  );
};

export default GalleryDetailPage;