"use client"
import React from 'react'
import 'swiper/css';
import 'swiper/css/pagination';
import { Address } from "@/types/data_type"
import { Card, CardBody} from '@nextui-org/card';
import { Image } from '@nextui-org/image';
import { motion } from "framer-motion"
import { Event } from '@prisma/client';
import { Swiper, SwiperSlide } from 'swiper/react'
import { Link } from '@nextui-org/link';

export default function CardSwiper({ title, items, fullPage }: { title?: string, items: Event[], fullPage?: string }) {
    return (
        <>
        {title && (
            <div className="flex flex-row justify-between">
                <h2 className="page-heading">{title}</h2>
                {fullPage && (
                    <Link isBlock href={fullPage}>Show all</Link>
                )}
            </div>
        )}

        
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
                            slidesPerView: 5,
                        },
                    }}
                    grabCursor={true}
                >
                    {items.map((event, index) => {
                        const address: Address = JSON.parse(event.event_location);
                        return (
                            <SwiperSlide key={index}>
                                <a href={`event/${event.event_id}`} key={index}>
                                    <Card className="min-h-96">
                                        <Image alt={event.event_name} className="object-cover rounded-xl h-80"  src={event.event_images} width={"320px"} />
                                        <CardBody className="overflow-visible py-2">
                                            <p className="text-tiny uppercase">{event.event_start_date.toLocaleDateString('en-US', { day: 'numeric', month: 'long'})}</p>
                                            <p className="text-tiny uppercase font-bold truncate">{event.event_name}</p>
                                            <small className="text-default-500 truncate">{`${address.address} ${address.city}, ${address.country}`}</small>
                                        </CardBody>
                                    </Card>
                                </a>
                            </SwiperSlide>
                        )

                    })}

                </Swiper>
            </motion.div>

        </>
    );
}
