"use client"

import { Card, CardBody } from "@nextui-org/card";
import { Image } from "@nextui-org/image";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import ImageSlider from '../components/slider'
import { eventItems } from "@/config/site";

export default function Home() {
    const router = useRouter();
    
    return (
        
        <div>
            <ImageSlider/>
            <h4 className="font-bold mt-4">Recommend</h4>
            <motion.div
                className="flex flex-row gap-2 overflow-x-scroll "
                initial={{ y: 100 }}
                animate={{ y: 0 }}
            >
                {eventItems.map((event, index)=> (
                    <Card className="min-w-52 flex-shrink-0" key={index} isPressable onPress={()=> router.push(`/event/${index}`)}>
                        <Image alt="Card background" className="object-cover rounded-xl" src={event.cover} width={270} />
                        <CardBody className="overflow-visible py-2">
                            <p className="text-tiny uppercase font-bold">{event.date.start} {event.date.end}</p>
                            <p className="text-tiny uppercase font-bold">{event.name}</p>
                            <small className="text-default-500 truncate">{event.location}</small>
                        </CardBody>
                    </Card>
                ))}
            </motion.div>
        </div>
    );
}
