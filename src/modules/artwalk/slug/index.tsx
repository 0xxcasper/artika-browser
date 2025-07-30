'use client';

import './styles.scss';
import { Flex, Image } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useMemo } from 'react';
import { artwalkRouter } from '@/constants/router';
// import EmailForm from '@/components/email-form';
import type { ArtwalkCategory } from '@/types/artwalk';

interface SlugArtwalkPageProps {
  categoryData: ArtwalkCategory | null;
  slug: string;
  lang: string;
}

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

const GalleryPage = ({ categoryData, slug }: SlugArtwalkPageProps) => {
  const router = useRouter();
  
  // Debug router
  console.log('categoryData object:', categoryData);
  console.log('artwalkRouter object:', artwalkRouter);
  
  // Use Prismic data if available, otherwise fallback to hardcoded data
  const COLLECTIONS = useMemo(() => {
    if (categoryData && categoryData?.contents?.length > 0) {
      return categoryData?.contents ?? [];
    }
    return [];
  }, [categoryData, slug]);

  const handleItemClick = (collection: any) => {
    try {
      console.log('Clicking item:', collection);
      console.log('Current slug:', slug);
      
      if (!router) {
        console.error('Router is undefined');
        return;
      }
      
      if (!artwalkRouter || !artwalkRouter.getDetailRouter) {
        console.error('artwalkRouter or getDetailRouter is undefined');
        return;
      }
      
      const detailPath = artwalkRouter.getDetailRouter({ 
        id: collection.id, 
        slug: slug 
      });
      
      console.log('Navigating to:', detailPath);
      router.push(detailPath);
    } catch (error) {
      console.error('Error navigating to detail:', error);
    }
  };

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
            {categoryData?.title}
          </h1>
          <p>
            {categoryData?.description}
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
            key={`${collection.id}-${index}`}
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
            onClick={() => handleItemClick(collection)}
          >
            <Image 
               src={collection.thumb} 
              alt={collection.name} 
              width={400} 
              height={480} 
              className="gallery-container__grids__item__image"
              // priority={index < 6}
              _placeholder={{
                blurDataURL: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkrHB0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEsMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
              }}
              draggable={false}
            />
            <div className="gallery-container__grids__item__content">
              <Flex flexDirection='row' gap="1rem" justify="space-between">
                <p className='gallery-container__grids__item__content__title'>{collection.name}</p>
                <p className='gallery-container__grids__item__content__material'>{collection.material}</p>
              </Flex>
              <p className='gallery-container__grids__item__content__description'>{collection.subName}</p>
            </div>
          </motion.div>
        ))}
      </motion.div>
      {/* <EmailForm /> */}
    </div>
  );
};

export default GalleryPage;