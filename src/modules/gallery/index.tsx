'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import { COLLECTIONS } from './constants';
import './styles.scss';
import Image from 'next/image';
import { Flex } from '@chakra-ui/react';
import { motion } from 'framer-motion';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { 
    opacity: 0, 
    y: 30,
    scale: 0.95
  },
  visible: { 
    opacity: 1, 
    y: 0,
    scale: 1,
    transition: { 
      duration: 0.6,
      ease: "easeOut"
    } 
  }
};

const headerVariants = {
  hidden: { 
    opacity: 0, 
    y: 20 
  },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { 
      duration: 0.8,
      ease: "easeOut"
    } 
  }
};

const GalleryPage = () => {
  const { t } = useLanguage();

  return (
    <div className="gallery-container">
      <motion.div 
        className="gallery-container__header"
        variants={headerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
      >
        <div className="gallery-container__header__title">
          <h1>
            {t('pages.gallery.hero.title')}
          </h1>
          <p>
            {t('pages.gallery.hero.subtitle')}
          </p>
        </div>
      </motion.div>
      
      <motion.div 
        className="gallery-container__grids"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        {COLLECTIONS.map((collection, index) => (
          <motion.div 
            className="gallery-container__grids__item" 
            key={collection.title}
            variants={itemVariants}
            whileHover={{ 
              y: -10,
              transition: { 
                duration: 0.3,
                ease: "easeOut"
              }
            }}
            viewport={{ once: true, margin: "-50px" }}
          >
            <motion.div
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <Image 
                src={collection.image} 
                alt={collection.title} 
                width={400} 
                height={480} 
                className="gallery-container__grids__item__image" 
              />
            </motion.div>
            <div className="gallery-container__grids__item__content">
              <Flex flexDirection='row' gap="1rem" justify="space-between">
                <p className='gallery-container__grids__item__content__title'>{collection.title}</p>
                <p className='gallery-container__grids__item__content__material'>{collection.material}</p>
              </Flex>
              <p className='gallery-container__grids__item__content__description'>{collection.description}</p>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default GalleryPage;