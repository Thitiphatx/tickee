"use server"

import CardGrid from "@/components/CardGrid"
import { IconPlusCircle } from "@/components/icons";
import { prisma } from "@/prisma/seed";
import { getCurrentSession } from "@/utils/getCurrentSession";
import { Link } from "@nextui-org/link";
import { redirect } from "next/navigation";

export default async function EventManagement() {
    const session = await getCurrentSession(); // Server Session
    if (!session) {
        redirect("/");
    }

    const items = await prisma.event.findMany({
        where: {
            producer_id: session.user.id
        }
    })
    return (
        <div>
            <div className="flex flex-row justify-between mb-10">
                <h1 className="font-bold text-3xl">Event organizer</h1>
                <Link color="success" href="/addevent" isBlock> <IconPlusCircle className="mr-2"/> Add event</Link>
            </div>
            
            <CardGrid items={items} />
        </div>
    )
}
