"use server"

import AddEventForm from "@/components/AddEventForm"
import { prisma } from "@/prisma/seed";
import { RoleAvailable } from "@/types/data_type";
import { redirectingByRole } from "@/utils/function";
import { getCurrentSession } from "@/utils/getCurrentSession";
import { redirect } from "next/navigation";

export default async function Addevent() {
    const session = await getCurrentSession(); // Server Session

    if (session?.user.role != RoleAvailable.Organizer || !session) {
        redirectingByRole(session)
    }

    const eventType = await prisma.event_Type.findMany();
    return (
        <div>
            <AddEventForm eventType={eventType}/>
        </div>
    )
}