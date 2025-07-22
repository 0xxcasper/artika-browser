declare module 'react-slick' {
  import React from 'react';
  
  interface Settings {
    dots?: boolean;
    infinite?: boolean;
    speed?: number;
    slidesToShow?: number;
    slidesToScroll?: number;
    centerMode?: boolean;
    centerPadding?: string;
    focusOnSelect?: boolean;
    responsive?: Array<{
      breakpoint: number;
      settings: Partial<Settings>;
    }>;
    [key: string]: any;
  }
  
  interface SliderProps extends Settings {
    children: React.ReactNode;
  }
  
  const Slider: React.ComponentType<SliderProps>;
  export default Slider;
} 