import type { SplitBannerSection } from '@/components/split-banner';

export interface SustainabilityData {
  aboutSection1: {
    title: string;
    description: string;
    buttonText: string;
    buttonLink: string;
  };
  mainBanner: {
    image: string;
    alt: string;
  };
  rowText: {
    title: string;
    description: string;
  };
  galleryGrid: {
    title: string;
    images: Array<{
      image: string;
      alt: string;
    }>;
  };
  aboutSection2: {
    title: string;
    description: string;
    buttonText: string;
    buttonLink: string;
  };
  splitBanner: {
    sections: SplitBannerSection[];
  };
  horizontalList: {
    title: string;
    items: Array<{
      href: string;
      title: string;
      image: string;
      alt: string;
    }>;
  };
}

export interface SustainabilityPageProps {
  sustainabilityData: SustainabilityData;
  lang: string;
}
