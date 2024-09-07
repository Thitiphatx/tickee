// components/ImageSlider.tsx
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation, Autoplay} from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

const images = [
  "https://atkmedia.allticket.com/assets/content/24053/RA01072024SlideBanner.jpg",
    "https://atkmedia.allticket.com/assets/content/21176/Maleehuana_30082024_SlideBanner.jpg",
    "https://atkmedia.allticket.com/assets/content/21168/Kaedum-SlideBanner.jpg",
    "https://atkmedia.allticket.com/assets/content/21175/30082024MOGP_Banner.jpeg"
];

const ImageSlider: React.FC = () => {
  return (
    <Swiper
      spaceBetween={10}
      slidesPerView={1}
      pagination={{ clickable: true}}
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
