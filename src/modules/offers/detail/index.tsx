'use client';

import type { OfferItem } from '@/types/offer';
import { Image, Link } from '@chakra-ui/react';
import styles from './styles.module.scss';

interface OfferDetailProps {
  item: OfferItem;
}

export default function OfferDetail({ item }: OfferDetailProps) {
  const d = item.detail;

  console.log('d.utilities', d.utilities);

  return (
    <div className={styles['offer-detail']}>
      <div className={styles['offer-detail__content']}>
        <div className={styles['offer-detail__left']}>
          <h2>{d.title}</h2>
          <p className={styles['lead']}>{d.description}</p>

          {d.utilities?.map((u, idx) => (
            <div key={idx} className={styles['offer-detail__section']}>
              <h4>{u.title}</h4>
              <ul>
                {u.contents?.map((c, i) => (
                  <li key={i}>{c}</li>
                ))}
              </ul>
            </div>
          ))}

          {!!d.buttonText && (
            <Link
              href={d.buttonHref || '#'}
              className={styles['offer-detail__primary-link']}
              isExternal={!!d.buttonHref && d.buttonHref.startsWith('http')}
            >
              {d.buttonText}
            </Link>
          )}
        </div>

        <div className={styles['offer-detail__right']}>
          <Image
            src={d.images?.[0] || '/images/home/banner-1.jpg'}
            alt={d.title}
            width="100%"
            height="auto"
            draggable={false}
          />
        </div>
      </div>

      <div className={styles['offer-detail__notes']}>
        <h3>{d.notes?.title}</h3>
        <ul>
          {d.notes?.contents?.map((c, i) => (
            <li key={i}>{c}</li>
          ))}
        </ul>

        {!!d.notes?.buttonText && (
          <Link
            href={d.notes?.buttonHref || '#'}
            className={styles['offer-detail__secondary-link']}
            isExternal={
              !!d.notes?.buttonHref && d.notes?.buttonHref.startsWith('http')
            }
          >
            {d.notes?.buttonText}
          </Link>
        )}
      </div>
    </div>
  );
}
