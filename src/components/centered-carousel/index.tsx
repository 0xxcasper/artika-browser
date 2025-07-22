'use client';

import React, { useRef } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './styles.scss';
import { motion } from 'framer-motion';

interface CarouselProps {
  images: string[];
  title: string;
}

const variants = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.8, ease: [0.34, 1.56, 0.64, 1] } }
};

const viewPort = {
  once: true,
  margin: "-100px",
  // amount: 0.3
}

// Desktop Arrow Components
const DesktopPrevArrow = (props: any) => {
  const { onClick } = props;
  return (
    <button
      className="custom-prev-arrow desktop-arrow"
      onClick={onClick}
      style={{
        position: 'absolute',
        left: '-50px',
        top: '50%',
        transform: 'translateY(-50%)',
        width: '50px',
        height: '50px',
        background: 'white',
        border: 'none',
        borderRadius: '50%',
        zIndex: 10,
        cursor: 'pointer',
        fontSize: '28px',
        fontWeight: 400,
        color: '#333',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      ‹
    </button>
  );
};

const DesktopNextArrow = (props: any) => {
  const { onClick } = props;
  return (
    <button
      className="custom-next-arrow desktop-arrow"
      onClick={onClick}
      style={{
        position: 'absolute',
        right: '-50px',
        top: '50%',
        transform: 'translateY(-50%)',
        width: '50px',
        height: '50px',
        background: 'white',
        border: 'none',
        borderRadius: '50%',
        zIndex: 10,
        cursor: 'pointer',
        fontSize: '28px',
        fontWeight: 400,
        color: '#333',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      ›
    </button>
  );
};

// Mobile Arrow Components
const MobilePrevArrow = (props: any) => {
  const { onClick } = props;
  return (
    <button
      className="custom-prev-arrow mobile-arrow"
      onClick={onClick}
      style={{
        position: 'absolute',
        left: '20px',
        top: '50%',
        transform: 'translateY(-50%)',
        width: '50px',
        height: '50px',
        background: 'rgba(255, 255, 255, 0.9)',
        border: 'none',
        borderRadius: '50%',
        zIndex: 20,
        cursor: 'pointer',
        fontSize: '28px',
        fontWeight: 400,
        color: '#333',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backdropFilter: 'blur(10px)',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)'
      }}
    >
      ‹
    </button>
  );
};

const MobileNextArrow = (props: any) => {
  const { onClick } = props;
  return (
    <button
      className="custom-next-arrow mobile-arrow"
      onClick={onClick}
      style={{
        position: 'absolute',
        right: '20px',
        top: '50%',
        transform: 'translateY(-50%)',
        width: '50px',
        height: '50px',
        background: 'rgba(255, 255, 255, 0.9)',
        border: 'none',
        borderRadius: '50%',
        zIndex: 20,
        cursor: 'pointer',
        fontSize: '28px',
        fontWeight: 400,
        color: '#333',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backdropFilter: 'blur(10px)',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)'
      }}
    >
      ›
    </button>
  );
};

export default function CenteredCarousel({ images, title }: CarouselProps) {
  const sliderRef = useRef<any>(null);

  // Desktop settings - 3 items with center mode
  const desktopSettings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    centerMode: true,
    centerPadding: '0px',
    focusOnSelect: true,
    swipeToSlide: true,
    prevArrow: <DesktopPrevArrow />,
    nextArrow: <DesktopNextArrow />,
  };

  // Mobile settings - 1 item at a time
  const mobileSettings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    centerMode: false,
    focusOnSelect: false,
    swipeToSlide: true,
    prevArrow: <MobilePrevArrow />,
    nextArrow: <MobileNextArrow />,
  };

  return (
    <div className="container">
      <motion.h1
        initial="hidden"
        whileInView="visible"
        variants={variants}
        viewport={viewPort}
      >
        {title}
      </motion.h1>  
      <motion.div 
        initial="hidden"
        whileInView="visible"
        variants={variants}
        viewport={viewPort}
        className="centered-carousel-container"
      >
        {/* Desktop Carousel */}
        <div className="desktop-carousel">
          <Slider ref={sliderRef} {...desktopSettings}>
            {images.map((src, index) => (
              <div key={index}>
                <div className="slide-item">
                  <img
                    src={src}
                    alt={`Carousel image ${index + 1}`}
                    draggable={false}
                  />
                </div>
              </div>
            ))}
          </Slider>
        </div>

        {/* Mobile Carousel */}
        <div className="mobile-carousel">
          <Slider {...mobileSettings}>
            {images.map((src, index) => (
              <div key={index}>
                <div className="slide-item mobile-slide">
                  <img
                    src={src}
                    alt={`Carousel image ${index + 1}`}
                    draggable={false}
                  />
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </motion.div>
    </div>
  );
}
