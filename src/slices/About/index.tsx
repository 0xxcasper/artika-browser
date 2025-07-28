import { SliceComponentProps } from '@prismicio/react';
import About from '@/components/about';
import { asText } from '@/libs/prismic-helpers';

export type AboutSliceProps = SliceComponentProps<{
  id: string;
  slice_type: 'about';
  slice_label: null;
  primary: {
    title: any;
    description: any;
    button_text: any;
  };
}>;

const AboutSlice = ({ slice }: AboutSliceProps) => {
  const title = asText(slice.primary.title);
  const description = asText(slice.primary.description);
  const buttonText = slice.primary.button_text;

  return (
    <About
      title={title || 'About Us'}
      description={description || 'Artika connects art with life'}
      button={buttonText || 'Learn More'}
    />
  );
};

export default AboutSlice; 