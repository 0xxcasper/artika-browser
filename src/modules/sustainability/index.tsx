'use client';

import About from '@/components/about';
import GalleryGrid from '@/components/gallery-grid';
import SplitBanner from '@/components/split-banner';
import RowText from '@/components/row-text';
import { Box, Image } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import type { SustainabilityPageProps } from '@/types/sustainability';
import HorizontalList from './components/HorizontalList';

const SustainabilityPage = ({
  sustainabilityData,
}: SustainabilityPageProps) => {
  return (
    <Box className="container-no-padding">
      <Box className="container" maxWidth="1568px" mx="auto" pb="0px">
        <About
          title={sustainabilityData.aboutSection1.title}
          description={sustainabilityData.aboutSection1.description}
          button={sustainabilityData.aboutSection1.buttonText}
        />

        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          whileInView={{
            opacity: 1,
            y: 0,
            scale: 1,
            transition: {
              duration: 0.8,
              ease: [0.25, 0.46, 0.45, 0.94],
              type: 'spring',
              stiffness: 100,
              damping: 15,
            },
          }}
          viewport={{ once: true, margin: '-100px' }}
          whileHover={{
            scale: 1.02,
            transition: { duration: 0.2 },
          }}
        >
          <Image
            src={sustainabilityData.mainBanner.image}
            alt={sustainabilityData.mainBanner.alt}
            width="100%"
            height="auto"
            objectFit="cover"
          />
        </motion.div>

        <RowText
          title={sustainabilityData.rowText.title}
          description={sustainabilityData.rowText.description}
        />

        <GalleryGrid
          images={sustainabilityData.galleryGrid.images.map((img) => img.image)}
          gap={24}
        />

        <About
          title={sustainabilityData.aboutSection2.title}
          description={sustainabilityData.aboutSection2.description}
          button={sustainabilityData.aboutSection2.buttonText}
        />

        {sustainabilityData.splitBanner.sections.length > 0 && (
          <SplitBanner
            sections={sustainabilityData.splitBanner.sections.map(
              (section, index) => ({
                ...section,
                textFirst: index % 2 !== 0,
              }),
            )}
          />
        )}
      </Box>
      <Box mx="auto" px="24px">
        <HorizontalList
          title={sustainabilityData.horizontalList.title}
          items={sustainabilityData.horizontalList.items}
        />
      </Box>
    </Box>
  );
};

export default SustainabilityPage;
