"use client"
import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import { eventItems } from '@/config/site';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import { Card, CardBody } from '@nextui-org/card';
import { Image } from '@nextui-org/image';
import { motion } from "framer-motion"
import { useRouter } from 'next/navigation';

export default function CardSwiper({ items }: { items: typeof eventItems }) {
    const router = useRouter();
    return (
        <>
            <motion.div
                initial={{ y: 200 }}
                animate={{ y: 0 }}
            >
                <Swiper
                    slidesPerView={5}
                    spaceBetween={10}
                    draggable={true}
                    breakpoints={{
                        0: {
                            slidesPerView: 2,
                        },
                        768: {
                            slidesPerView: 3,
                        },
                        1024: {
                            slidesPerView: 4,
                        },
                    }}
                    grabCursor={true}
                >
                    {items.map((event, index) => (
                        <SwiperSlide key={index}>
                            <Card className="min-w-52 flex-shrink-0" key={index} isPressable onPress={() => router.push(`/event/${index}`)}>
                                <Image alt="Card background" className="object-cover rounded-xl" src={event.cover} width={270} />
                                <CardBody className="overflow-visible py-2">
                                    <p className="text-tiny uppercase font-bold">{event.date.start} {event.date.end}</p>
                                    <p className="text-tiny uppercase font-bold">{event.name}</p>
                                    <small className="text-default-500 truncate">{event.location}</small>
                                </CardBody>
                            </Card>
                        </SwiperSlide>
                    ))}

                </Swiper>
            </motion.div>

        </>
    );
}
