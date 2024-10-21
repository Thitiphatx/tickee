"use server"
import CardGrid from "@/components/CardGrid";
import { prisma } from "@/prisma/seed";

export default async function Sport() {
    const data = await prisma.event.findMany({
        include: {
            event_type: true,
            producer: true,
        },
        where: {
            event_type: {
                et_name: "Sport"
            }
        },
        orderBy: {
            event_last_date: "asc"
        }
    })

    return (
        <div>
            <h1 className="font-bold text-3xl mb-10">Sport</h1>
            <CardGrid items={data}/>
        </div>
    )
};
