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

const HorizontalList: React.FC = () => {
  const { slug } = useParams();
  const router = useRouter();
  const COLLECTIONS = useMemo(() => {
    const collections = ARTWALK_COLLECTION?.[slug as SubMenuType]?.collections;
    if (!collections) {
      return [];
    }
    return collections;
  }, [slug]);

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
  return (
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
  );
};

export default HorizontalList;
