"use client"
import { eventItems } from "@/config/site";
import { getConcertEvent } from "./fetch";
import { Card, CardBody } from "@nextui-org/card";
import { Image } from "@nextui-org/image";
import { motion } from "framer-motion";
import { useRouter, notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";

export default async function Concert() {
    

    // const res = await getConcertEvent();
    // if (!res) {
    //     notFound()
    // }
    // const concertEvent = res;
    const router = useRouter()

    
    const concertEvent = eventItems

    return (
        <div>
            <h1 className="font-bold text-3xl mb-10">Concert</h1>
            <div className="flex w-full flex-wrap justify-start gap-8">
                {concertEvent.map((event, index) => (
                    <Card className="min-w-52 flex-shrink-0" key={index} isPressable onPress={() => router.push(`/event/${index}`)}>
                        <Image alt="Card background" className="object-cover rounded-xl" src={event.cover} width={270} />
                        <CardBody className="overflow-visible py-2">
                            <p className="text-tiny uppercase font-bold">{event.date.start} {event.date.end}</p>
                            <p className="text-tiny uppercase font-bold">{event.name}</p>
                            <small className="text-default-500 truncate">{event.location}</small>
                        </CardBody>
                    </Card>
                ))}
            </div>
        </div>
    )
};
