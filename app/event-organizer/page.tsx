"use server"

import CardGrid from "@/components/CardGrid"
import { prisma } from "@/prisma/seed";
import { getCurrentSession } from "@/utils/getCurrentSession";
import { Button } from "@nextui-org/button";
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
            Event organizer
            <Link href="/addevent">Add event</Link>
            <CardGrid items={items} />
        </div>
    )
}
