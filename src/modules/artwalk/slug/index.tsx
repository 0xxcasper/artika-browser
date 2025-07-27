'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import { ARTWALK_COLLECTION } from '@/constants/artwalk';
import './styles.scss';
import Image from 'next/image';
import { Flex } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { useParams, useRouter } from 'next/navigation';
import { SubMenuType } from '@/locales/types';
import { useMemo } from 'react';
import { artwalkRouter } from '@/constants/router';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { 
    opacity: 0, 
    y: 50
  },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { 
      duration: 0.4,
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
      duration: 0.4,
      ease: "easeOut"
    } 
  }
};

const GalleryPage = () => {
  const { t } = useLanguage();
  const router = useRouter();
  const { slug } = useParams();
  const COLLECTIONS = useMemo(() => {
    const collections = ARTWALK_COLLECTION?.[slug as SubMenuType]?.collections;
    if (!collections) {
      return [];
    }
    return collections;
  }, [slug]);

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
            {t('pages.artwalk.hero.title')}
          </h1>
          <p>
            {t('pages.artwalk.hero.subtitle')}
          </p>
        </div>
      </motion.div>
      
      <motion.div 
        className="gallery-container__grids"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
      >
        {COLLECTIONS.map((collection, index) => (
          <motion.div 
            className="gallery-container__grids__item" 
            key={`${collection.title}-${index}`}
            variants={itemVariants}
            initial="hidden"
            whileInView="visible"
            whileHover={{ 
              y: -2,
              transition: { 
                duration: 0.2,
                ease: "easeOut"
              }
            }}
            viewport={{ once: true, margin: "-50px" }}
            onClick={() => {
              router.push(artwalkRouter.getDetailRouter({ id: collection.id, slug: slug as string }));
            }}
          >
            <Image 
              src={collection.image} 
              alt={collection.title} 
              width={400} 
              height={480} 
              className="gallery-container__grids__item__image"
              priority={index < 6}
              placeholder="blur"
              draggable={false}
              blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkrHB0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
            />
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