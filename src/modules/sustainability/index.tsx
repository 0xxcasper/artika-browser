'use client';

import About from '@/components/about';
import GalleryGrid from '@/components/gallery-grid';
import SplitBanner from '@/components/split-banner';
import RowText from '@/components/row-text';
import { Box, Image } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import type { SustainabilityPageProps } from '@/types/sustainability';
import ScheduleTourForm from '@/components/schedule-tour-form';

const SustainabilityPage = ({
  sustainabilityData,
}: SustainabilityPageProps) => {
  return (
    <Box className="container-no-padding">
      <Box
        className="container"
        maxWidth="1568px"
        mx="auto"
        pb="0px"
        gap={{
          base: '80px',
          md: '100px',
        }}
      >
        <About
          title={sustainabilityData.aboutSection1.title}
          description={sustainabilityData.aboutSection1.description}
          button={sustainabilityData.aboutSection1.buttonText}
          unAcceptPaddingMb={true}
          type="header"
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
          unAcceptPaddingMb={true}
        />

        {sustainabilityData?.splitBanner?.sections?.length > 0 && (
          <SplitBanner
            sections={[sustainabilityData.splitBanner.sections[0]!].map(
              (section) => ({
                ...section,
                textFirst: false,
              }),
            )}
            unAcceptPaddingMb={true}
          />
        )}
        <About
          title={sustainabilityData.aboutSection3.title}
          description={sustainabilityData.aboutSection3.description}
          button={sustainabilityData.aboutSection3.buttonText}
          unAcceptPaddingMb={true}
        />
        {sustainabilityData?.splitBanner?.sections?.length > 1 && (
          <SplitBanner
            sections={[sustainabilityData.splitBanner.sections[1]!].map(
              (section) => ({
                ...section,
                textFirst: true,
              }),
            )}
            unAcceptPaddingMb={true}
          />
        )}
      </Box>
      {/* <Box mx="auto" px="0">
        <HorizontalList
          title={sustainabilityData.horizontalList.title}
          items={sustainabilityData.horizontalList.items}
        />
      </Box> */}

      <ScheduleTourForm tourData={sustainabilityData.scheduleTour} />
    </Box>
  );
};

export default SustainabilityPage;
