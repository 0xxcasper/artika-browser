import { Grid, GridItem, Image } from '@chakra-ui/react';

import { motion } from 'framer-motion';

export type GalleryImage = string;

export interface GalleryGridProps {
  className?: string;
  images: GalleryImage[];
  gap?: number;
}

export default function GalleryGrid({ images, gap = 24 }: GalleryGridProps) {
  return (
    <Grid templateColumns="repeat(4, 1fr)" gap={`${gap}px`}>
      {images.map((image, index) => (
        <GridItem
          as={motion.div}
          key={index}
          colSpan={index === 0 ? 2 : index === 1 ? 2 : 4}
          whileHover={{ scale: 1.02 }}
          variants={{
            hidden: { opacity: 0, y: 50 },
            visible: {
              opacity: 1,
              y: 0,
              transition: {
                duration: 0.8,
                ease: 'easeOut',
              },
            },
          }}
          transition="all 0.3s linear"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
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
  );
}
