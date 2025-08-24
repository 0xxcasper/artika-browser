import { Box, Flex, Image } from '@chakra-ui/react';
import styles from './styles.module.scss';

const data = [
  {
    href: 'forest-bathing',
    title: 'Forest & Bamboo',
    image: '/images/collections/collection-1.jpg',
  },
  {
    href: 'forest-bamboo',
    title: 'Forest & Bamboo',
    image: '/images/collections/collection-1.jpg',
  },
  {
    href: 'forest-bamboo',
    title: 'Forest & Bamboo',
    image: '/images/collections/collection-1.jpg',
  },
  {
    href: 'forest-bamboo',
    title: 'Forest & Bamboo',
    image: '/images/collections/collection-1.jpg',
  },
  {
    href: 'forest-bamboo',
    title: 'Forest & Bamboo',
    image: '/images/collections/collection-1.jpg',
  },
];

const HorizontalList = () => {
  return (
    <Flex className={styles.container}>
      <h2>More of Artika</h2>
      <Box className={styles.scrollContainer}>
        <Box className={styles.list}>
          {data.map((item, index) => (
            <Box key={`${item.href}-${index}`} className={styles.item}>
              <Image
                src={item.image}
                alt={item.title}
                width="100%"
                height="auto"
                objectFit="cover"
              />
              <p className={styles.title}>{item.title}</p>
            </Box>
          ))}
        </Box>
      </Box>
    </Flex>
  );
};

export default HorizontalList;
