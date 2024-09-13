"use client"
import React, { useRef } from 'react'

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import { Card, CardBody } from '@nextui-org/card';
import { Image } from '@nextui-org/image';
import { motion } from "framer-motion"
import { useRouter } from 'next/navigation';
import { Event } from '@prisma/client';
import { Swiper, SwiperSlide } from 'swiper/react'

export default function CardSwiper({ items }: { items: Event[] }) {
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
                            <Card className="min-w-52 flex-shrink-0" key={index} isPressable onPress={() => router.push(`/event/${event.event_id}`)}>
                                <Image alt="Card background" className="object-cover rounded-xl" src={""} width={390} height={270} />
                                <CardBody className="overflow-visible py-2">
                                    <p className="text-tiny uppercase font-bold">{event.event_name}</p>
                                    <small className="text-default-500 truncate">{event.event_location}</small>
                                </CardBody>
                            </Card>
                        </SwiperSlide>
                    ))}

                </Swiper>
            </motion.div>

        </>
    );
}
