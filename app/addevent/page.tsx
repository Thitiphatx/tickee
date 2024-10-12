"use server"

import AddEventForm from "@/components/AddEventForm"
import { prisma } from "@/prisma/seed";
import { getCurrentSession } from "@/utils/getCurrentSession";
import { redirect } from "next/navigation";

export default async function Addevent() {
    const session = await getCurrentSession(); // Server Session
    console.log(session)
    if (!session || session.user.role !== "organizer") {
        redirect("/");
    }

    const eventType = await prisma.event_Type.findMany();
    return (
        <div>
            <AddEventForm eventType={eventType}/>
        </div>
    )
}