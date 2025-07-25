'use client';
import './styles.scss'; 
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Image } from '@chakra-ui/react';
const GalleryDetailPage = () => {

  const banners = [
    '/images/collections/detail/test-1.jpg',
    '/images/collections/detail/test-2.jpg',
  ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    pauseOnHover: true,
    appendDots: (dots: any) => (
      <div style={{
        position: 'absolute',
        bottom: '10px',
        width: '100%',
      }}>
        {dots}
      </div>
    ),
  };

  return (
    <div className="gallery-detail-container">
      <Slider {...settings}>
        {banners.map((banner, index) => (
          <div key={index}>
            <Image 
              src={banner}
              alt="banner" 
              width="100%" 
              height="auto" 
              draggable={false} 
              style={{
                objectFit: 'cover',
                objectPosition: 'center',
              }} 

              aspectRatio={{
                base: "2.2/1",
                xl: "2.5/1",
              }}
            />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default GalleryDetailPage;