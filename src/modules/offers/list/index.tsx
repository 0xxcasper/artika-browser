'use client';

import { offersRouter } from '@/constants/router';
import type { OfferPageData } from '@/types/offer';
import { Image, Link } from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
import { useMemo } from 'react';
import styles from './styles.module.scss';

interface OffersListProps {
  data: OfferPageData;
  lang: string;
}

export default function OffersList({ data, lang }: OffersListProps) {
  const router = useRouter();
  const items = useMemo(() => data.items ?? [], [data]);

  return (
    <div className={styles['offers-list']}>
      <div className={styles['offers-list__header']}>
        <h1>{data.title}</h1>
        <p>{data.description}</p>
      </div>

      <div className={styles['offers-list__grid']}>
        {items.map((item) => (
          <div key={item.id} className={styles['offers-list__card']}>
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
                onClick={(e) => {
                  e.stopPropagation();
                  router.push(
                    offersRouter.getDetailRouter({ id: item.id }, lang),
                  );
                }}
                className={styles['offers-list__card__link']}
              >
                View detail
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
