import { Box, Flex, Image } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import styles from './styles.module.scss';

interface HorizontalListProps {
  title: string;
  items: Array<{
    href: string;
    title: string;
    image: string;
    alt: string;
  }>;
}

const HorizontalList = ({ title, items }: HorizontalListProps) => {
  const router = useRouter();

  const handleItemClick = (href: string) => {
    if (href.includes('http')) {
      window.open(href, '_blank');
    } else {
      router.push(href);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{
        opacity: 1,
        y: 0,
        transition: {
          duration: 0.8,
          ease: 'linear',
        },
      }}
      viewport={{ once: true, margin: '-50px' }}
    >
      <Flex className={styles.container}>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{
            opacity: 1,
            y: 0,
            transition: {
              duration: 0.6,
              ease: 'linear',
              delay: 0.2,
            },
          }}
          viewport={{ once: true }}
        >
          {title}
        </motion.h2>
        <Box className={styles.scrollContainer}>
          <Box className={styles.list}>
            {items.map((item, index) => (
              <motion.div
                key={`${item.href}-${index}`}
                initial={{ opacity: 0, x: 30 }}
                whileInView={{
                  opacity: 1,
                  x: 0,
                  transition: {
                    duration: 0.5,
                    ease: 'linear',
                    delay: index * 0.1,
                  },
                }}
                viewport={{ once: true }}
                onClick={() => handleItemClick(item.href)}
                style={{ cursor: 'pointer' }}
              >
                <Box className={styles.item}>
                  <Image
                    src={item.image}
                    alt={item.alt}
                    width="100%"
                    height="auto"
                    objectFit="cover"
                    transition="all 0.2s ease-in-out"
                  />
                  <p className={styles.title}>{item.title}</p>
                </Box>
              </motion.div>
            ))}
          </Box>
        </Box>
      </Flex>
    </motion.div>
  );
};

export default HorizontalList;
