"use server"
import CardGrid from "@/components/CardGrid";
import { IconFaceSadTear } from "@/components/icons";
import { prisma } from "@/prisma/seed";

export default async function Entertainment() {
    const data = await prisma.event.findMany({
        include: {
            event_type: true,
            producer: true,
        },
        where: {
            event_type: {
                et_name: "Entertainment"
            }
        },
        orderBy: {
            event_last_date: "asc"
        }
    })

    return (
        <div>
            <h1 className="font-bold text-3xl mb-10">Entertainment</h1>
            <CardGrid items={data}/>
        </div>
    )
};
