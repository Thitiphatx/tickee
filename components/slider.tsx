"use client"
import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

export const revalidate = 0;

const ImageSlider: React.FC = () => {

  const [images,setimages] = useState<string[]>([]);

  useEffect (()=>{
    const fecthbanner = async () => {
      try{
        const response = await fetch('/api/webConfigData');
        if (!response.ok) {
          throw new Error('Failed to fetch images');
        }
        const data = await response.json();
        setimages(data.banner_images);
      }
      catch(error){
        console.error('Error fetching banner images:', error);
      }
    }
    fecthbanner();
    },[]);


  return (
    <Swiper
      spaceBetween={10}
      slidesPerView={1}
      pagination={{ clickable: true }}
      navigation
      scrollbar={{ draggable: true }}
      autoplay={{ delay: 3000 }}
      modules={[Pagination, Navigation, Autoplay]}
    >
      {images.map((src, index) => (
        <SwiperSlide key={index}>
          <img src={src} alt={`Slide ${index + 1}`} style={{ width: '100%', height: 'auto' }} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default ImageSlider;
