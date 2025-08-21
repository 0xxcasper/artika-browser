'use client';

import { offersRouter } from '@/constants/router';
import type { OfferPageData } from '@/types/offer';
import { Box, Image } from '@chakra-ui/react';
import Link from 'next/link';
import { useMemo } from 'react';
import styles from './styles.module.scss';
import About from '@/components/about';
import { motion } from 'framer-motion';

interface OffersListProps {
  data: OfferPageData;
  lang: string;
}

export default function OffersList({ data, lang }: OffersListProps) {
  const items = useMemo(() => data.items ?? [], [data]);

  return (
    <div className={styles['offers-list']}>
      <Box maxW="772px" mx="auto">
        <About title={data.title} description={data.description} button="" />
      </Box>

      <div className={styles['offers-list__grid']}>
        {items.map((item, index) => (
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
            key={item.id}
            className={styles['offers-list__card']}
          >
            <Image
              src={item.images?.[0] || '/images/home/banner-1.jpg'}
              alt={item.title}
              width="100%"
              height="auto"
              className={styles['offers-list__card__img']}
              draggable={false}
            />
            <div className={styles['offers-list__card__content']}>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
              <Link
                href={offersRouter.getDetailRouter({ id: item.id }, lang)}
                onClick={(e) => {
                  e.stopPropagation();
                  // router.push(
                  //   offersRouter.getDetailRouter({ id: item.id }, lang),
                  // );
                }}
                className={styles['offers-list__card__link']}
              >
                View detail
              </Link>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
