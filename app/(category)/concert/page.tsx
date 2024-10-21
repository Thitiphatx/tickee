"use server"
import CardGrid from "@/components/CardGrid";
import Comingsoon from "@/components/comingsoon";
import { prisma } from "@/prisma/seed";

export default async function Concert() {
    const today = new Date();
    const concert = await prisma.event.findMany({
        include: {
            event_type: true,
            producer: true,
        },
        where: {
            event_type: {
                et_name: "Concert"
            },
            event_last_date: {
                gt: today, // Filter events where event_last_date is greater than today
            }
        },
        orderBy: {
            event_last_date: "asc"
        }
    })
    return (
            <div>
            <h1 className="font-bold text-3xl mb-10">Concert</h1>
            {concert.length > 0 ? (
                <CardGrid items={concert} />
            ) : (
                <Comingsoon/>
            )}
        </div>   
    )

};
