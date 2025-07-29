'use client';

import React, { useMemo } from 'react';
import styles from './styles.module.scss';

import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Flex, Image } from '@chakra-ui/react';
import { ARTWALK_COLLECTION } from '@/constants/artwalk';
import { useParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { SubMenuType } from '@/locales/types';
import { artwalkRouter } from '@/constants/router';
import type { ArtwalkContent } from '@/types/artwalk';

interface HorizontalListProps {
  otherProjects?: ArtwalkContent[];
  currentProjectId?: string;
  title?: string;
}

const HorizontalList: React.FC<HorizontalListProps> = ({ 
  otherProjects, 
  currentProjectId, 
  title = "OTHER PROJECTS" 
}) => {
  const { slug } = useParams();
  const router = useRouter();
  
  const COLLECTIONS = useMemo(() => {
    // If otherProjects provided, use them
    if (otherProjects && otherProjects.length > 0) {
      return otherProjects
        .filter(project => project.id !== currentProjectId) // Exclude current project
        .map(project => ({
          id: project.id,
          title: project.name,
          material: project.material,
          description: project.subName,
          image: project.thumb || '/images/gallery/collections/glr-1.jpg'
        }));
    }
    
    // Fallback to hardcoded data
    const collections = ARTWALK_COLLECTION?.[slug as SubMenuType]?.collections;
    if (!collections) {
      return [];
    }
    return collections;
  }, [otherProjects, currentProjectId, slug]);

  const settings = {
    dots: false,
    infinite: true,
    speed: 1000,
    slidesToShow: 4,
    autoplay: true,
    autoplaySpeed: 5000,
    pauseOnHover: true,
    pauseOnFocus: true,
    responsive: [
      {
        breakpoint: 1440,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
        },
      },
    ],
  };

  if (COLLECTIONS.length === 0) {
    return null;
  }

  return (
    <div className={styles.container}>
      <motion.h2 
        className={styles.sectionTitle}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      >
        {title}
      </motion.h2>
      <Slider {...settings} className={styles.horizontalList}>
        {COLLECTIONS.map((collection, index) => (
          <motion.div
            className={styles.item}
            key={`${collection.title}-${index}`}
            onClick={() => router.push(artwalkRouter.getDetailRouter({ id: collection.id, slug: slug as string }))}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.08, ease: 'easeOut' }}
            whileHover={{ y: -2, opacity: 0.8, transition: { duration: 0.2, ease: "easeOut" } }}
          >
            <Image src={collection.image} alt={collection.title} aspectRatio="1/1.2" objectFit="cover" borderRadius="10px" />
            <Flex direction="column" mt={{ base: "16px", md: "24px" }}>
              <Flex flexDirection="row" gap="10px" justifyContent="space-between">
                <p className={styles.title}>
                  {collection.title}
                </p>
                <p className={styles.material}>
                  {collection.material}
                </p>
              </Flex>
              <p className={styles.description}>
                {collection.description}
              </p>
            </Flex>
          </motion.div>
        ))}
      </Slider>
    </div>
  );
};

export default HorizontalList;
