"use client"
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

export default function ImageSlider({ image_item }: { image_item: string[] }) {

    if (image_item.length == 0) {
        return (
            <></>
        )
    }
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
            {image_item.map((src, index) => (
                <SwiperSlide key={index}>
                    <img src={src} alt={`Slide ${index + 1}`} style={{ width: '100%', height: 'auto' }} />
                </SwiperSlide>
            ))}
        </Swiper>
    );
};
