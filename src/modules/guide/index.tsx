import type { GuideData } from '@/types/guide';
import Hero from '@/components/hero';
import { Box } from '@chakra-ui/react';
import About from '@/components/about';
import SplitBanner from '@/components/split-banner';
import Prepare from '@/components/prepare';
import Map from '@/components/map';
import ScheduleTourFormVer2 from '@/components/schedule-tour-form/ScheduleVer2';
import type { ScheduleTourData } from '@/types/schedule-tour';

interface GuideProps {
  guideData: GuideData;
}

const Guide = ({ guideData }: GuideProps) => {
  const map = guideData.mapSections[0];
  return (
    <Box className="container-no-padding">
      <Hero
        title={guideData.hero.title}
        subtitle={guideData.hero.subtitle}
        backgroundImage={guideData.hero.backgroundImage}
      />
      <About
        title={guideData.about.title}
        description={guideData.about.description}
        button={guideData.about.buttonText}
        buttonLink={guideData.about.buttonLink}
      />
      <SplitBanner
        sections={guideData.splitBanner.sections.map((section, index) => ({
          ...section,
          textFirst: index % 2 !== 0,
        }))}
      />
      <Prepare
        title={guideData.prepare.title}
        items={guideData.prepare.items}
      />
      {map && map?.image && (
        <Map
          title={map.title}
          description={map.description}
          linkHref={map.link}
          image={map.image}
        />
      )}
      {!!guideData.scheduleTour && (
        <ScheduleTourFormVer2
          tourData={guideData.scheduleTour as unknown as ScheduleTourData}
        />
      )}
    </Box>
  );
};

export default Guide;
