import React from 'react';
import styles from './styles.module.scss';
import Image from 'next/image';

interface HorizontalMoreProps {
  className?: string;
}

const HorizontalMore: React.FC<HorizontalMoreProps> = ({ className }) => {
  const items = [
    {
      id: 1,
      title: 'Forest Bathing',
      image: '/images/collections/collection-1.jpg',
      alt: 'Two men enjoying a foot bath in a serene indoor setting with nature views',
    },
    {
      id: 2,
      title: 'Personal Museum',
      image: '/images/collections/collection-1.jpg',
      alt: 'Woman examining wooden sculptures in an indoor gallery space',
    },
    {
      id: 3,
      title: 'Sculpture Park',
      image: '/images/collections/collection-1.jpg',
      alt: 'Outdoor landscape with large white abstract sculptures on a green hill',
    },
  ];

  return (
    <section className={`${styles.horizontalMore} ${className || ''}`}>
      <div className={styles.container}>
        <h2 className={styles.title}>More of Artika</h2>
        <div className={styles.panels}>
          {items.map((item) => (
            <div key={item.id} className={styles.panel}>
              <div className={styles.imageWrapper}>
                <Image
                  src={item.image}
                  alt={item.alt}
                  width={542}
                  height={400}
                  className={styles.image}
                />
              </div>
              <h3 className={styles.caption}>{item.title}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HorizontalMore;
