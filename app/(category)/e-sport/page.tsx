"use client"
import { eventItems } from "@/config/site";
import { Card, CardBody } from "@nextui-org/card";
import { Image } from "@nextui-org/image";
import { motion } from "framer-motion";
import { useRouter, notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import CardGrid from "@/components/CardGrid";
import Comingsoon from "@/components/comingsoon";

export default async function ESport() {
    const esport = await prisma.event.findMany({
        include: {
            event_type: true,
            producer: true,
        }, where: {
            event_type: {
                et_name: "E-Sport"
            }
        }, orderBy: {
            event_last_date: "asc"
        }
    })

    return (
        <div>
            <h1 className="font-bold text-3xl mb-10">Esport</h1>
            {esport.length > 0 ? (
                <CardGrid items={esport} />
            ) : (
                <Comingsoon/>
            )}
        </div>
    );
};
