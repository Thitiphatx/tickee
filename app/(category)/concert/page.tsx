"use server"
import CardGrid from "@/components/CardGrid";
import { prisma } from "@/prisma/seed";

export default async function Concert() {
    const concert = await prisma.event.findMany({
        include: {
            event_type: true,
            producer: true,
        },
        where: {
            event_type: {
                et_name: "Concert"
            }
        },
        orderBy: {
            event_last_date: "asc"
        }
    })

    return (
        <div>
            <h1 className="font-bold text-3xl mb-10">Concert</h1>
            <CardGrid items={concert}/>
        </div>
    )
};
