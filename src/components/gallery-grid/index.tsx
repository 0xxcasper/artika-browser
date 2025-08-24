import { Grid, GridItem, Image } from '@chakra-ui/react';
import { motion } from 'framer-motion';

export type GalleryImage = string;

export interface GalleryGridProps {
  className?: string;
  images: GalleryImage[];
  gap?: number;
}

export default function GalleryGrid({ images, gap = 24 }: GalleryGridProps) {
  // Container animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        // delayChildren: 0.1,
      },
    },
  };

  // Individual item animation variants
  const itemVariants = {
    hidden: {
      opacity: 0,
      y: 20,
      scale: 0.95,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: [0.25, 0.46, 0.45, 0.94], // Custom easing
        type: 'spring',
        stiffness: 100,
        damping: 15,
      },
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{
        once: true,
        margin: '-100px', // Start animation slightly before fully in view
      }}
    >
      <Grid templateColumns="repeat(4, 1fr)" gap={`${gap}px`}>
        {images.map((image, index) => (
          <GridItem
            as={motion.div}
            key={index}
            colSpan={index === 0 ? 2 : index === 1 ? 2 : 4}
            variants={itemVariants}
            // whileHover={{
            //   scale: 1.03,
            //   transition: { duration: 0.2 },
            // }}
            // whileTap={{ scale: 0.98 }}
          >
            <Image
              src={image}
              alt={`Gallery image ${index + 1}`}
              width="100%"
              height="auto"
              objectFit="cover"
            />
          </GridItem>
        ))}
      </Grid>
    </motion.div>
  );
}
