"use client"
import { eventItems } from "@/config/site";
import { Card, CardBody } from "@nextui-org/card";
import { Image } from "@nextui-org/image";
import { motion } from "framer-motion";
import { useRouter, notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import CardGrid from "@/components/CardGrid";
import Comingsoon from "@/components/comingsoon";

export default async function Entertainment() {
    const today = new Date();
    const Entertainment = await prisma.event.findMany({
        include:{
            event_type:true,
            producer:true,
        },where: {
            event_type:{
                et_name:"Entertainment"
            },
            event_last_date: {
                gt: today, // Filter events where event_last_date is greater than today
            }
        },orderBy : {
            event_last_date:"asc"
        }
    })

    return (
        <div>
            <h1 className="font-bold text-3xl mb-10">Entertainment</h1>
            {Entertainment.length > 0 ? (
                <CardGrid items={Entertainment}/>
            ) : (
                <Comingsoon/>
            )}
            
        </div>
    )
};
