'use client';

import React from 'react';
import styles from './styles.module.scss';

import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Flex, Image } from '@chakra-ui/react';
import { COLLECTIONS } from '@/modules/gallery/constants';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';


// const collections = [
//   {
//     src: '/images/collections/collection-1.jpg',
//     title: 'Caravan Agafay | Morocco',
//     desc: 'Our Home in the Agafay Desert',
//     cta: 'DISCOVER CARAVAN AGAFAY',
//   },
//   {
//     src: '/images/collections/collection-2.jpg',
//     title: 'Caravan Dakhla | Morocco',
//     desc: 'Our Home of Wind Adventures',
//     cta: 'DISCOVER CARAVAN DAKHLA',
//   },
//   {
//     src: '/images/collections/collection-3.jpg',
//     title: 'Namibia | Namibia',
//     desc: 'Our Home on the Kalahari Savanna',
//     cta: 'DISCOVER NAMIBIA',
//   },
//   {
//     src: '/images/collections/collection-4.jpg',
//     title: 'San Miguel | Mexico',
//     desc: 'Our Home Where Art & Nature Collide',
//     cta: 'DISCOVER SAN MIGUEL',
//   },
//   {
//     src: '/images/collections/collection-5.jpg',
//     title: 'Tulum | Mexico',
//     desc: 'Our Home Where the Jungle Meets the Sea',
//     cta: 'DISCOVER TULUM',
//   },
//   {
//     src: '/images/collections/collection-6.jpg',
//     title: 'Bacalar | Mexico',
//     desc: 'Our Home on the Blue Lagoon',
//     cta: 'DISCOVER BACALAR',
//   },
//   {
//     src: '/images/collections/collection-7.jpg',
//     title: 'Marrakech | Morocco',
//     desc: 'Our Home in the Red City',
//     cta: 'DISCOVER MARRAKECH',
//   },
// ];

const HorizontalList: React.FC = () => {
  const router = useRouter();
  const settings = {
    dots: false,
    infinite: true,
    speed: 1000,
    slidesToShow: 4,
    autoplay: true,
    autoplaySpeed: 5000,
    pauseOnHover: false,
    pauseOnFocus: false,
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
          onClick={() => router.push(`/gallery/${collection.id}`)}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.08, ease: 'easeOut' }}
          whileHover={{ scale: 1.04, transition: { type: 'spring', stiffness: 400, damping: 25 } }}
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
