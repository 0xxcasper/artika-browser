import { SliceComponentProps } from '@prismicio/react';
import Hero from '@/components/hero';
import { asText, asImageUrl } from '@/libs/prismic-helpers';

export type HeroSliceProps = SliceComponentProps<{
  id: string;
  slice_type: 'hero';
  slice_label: null;
  primary: {
    title: any;
    subtitle: any;
    background_image: any;
  };
}>;

export default function HeroSlice({ slice }: HeroSliceProps) {
  const title = asText(slice.primary.title) || '';
  const subtitle = asText(slice.primary.subtitle) || '';
  const backgroundImage = asImageUrl(slice.primary.background_image) || '/images/home/banner.jpg';

  return (
    <Hero
      title={title}
      subtitle={subtitle}
      backgroundImage={backgroundImage}
    />
  );
} 