"use client"
import React, { useRef } from 'react'
import { eventItems } from '@/config/site'
import { Card, CardBody } from '@nextui-org/card'
import { Image } from '@nextui-org/image'
import { useRouter } from 'next/navigation'

export default function CardSwiper ({ items }: { items: typeof eventItems}) {
    const router = useRouter();
    return (
        <div className="event-card-box">
            {items.map((event, index)=> (
                <Card className="event-card" key={index} isPressable onPress={()=> router.push(`/event/${index}`)}>
                    <Image src={event.cover} width={"100%"} />
                    <CardBody>
                        <p>{event.date.start} {event.date.end}</p>
                        <p>{event.name}</p>
                        <small>{event.location}</small>
                    </CardBody>
                </Card>
            ))}
        </div>
    )
}