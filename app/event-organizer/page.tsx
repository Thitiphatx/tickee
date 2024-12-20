"use server"

import CardGrid from "@/components/CardGrid"
import { IconPlusCircle } from "@/components/icons";
import PaginationComp from "@/components/PaginationComp";
import { PAGE_SIZE } from "@/config/site";
import { prisma } from "@/prisma/seed";
import { RoleAvailable } from "@/types/data_type";
import { redirectingByRole } from "@/utils/function";
import { getCurrentSession } from "@/utils/getCurrentSession";
import { Link } from "@nextui-org/link";

export default async function EventManagement({ searchParams }: { searchParams: { page?: string } }) {
    const currentPage = parseInt(searchParams.page || '1', 10);
    const session = await getCurrentSession();

    if (!session || session?.user.role != RoleAvailable.Organizer) {
        redirectingByRole(session)
        return
    }

    const totalEvents = await prisma.event.count({
        where: {
            producer_id: session.user.id
        }
    });
    
    const totalPages = Math.ceil(totalEvents / PAGE_SIZE);

    const items = await prisma.event.findMany({
        where: {
            producer_id: session.user.id
        },
        orderBy: {
            event_last_date: "asc",
        },
        skip: (currentPage - 1) * PAGE_SIZE,
        take: PAGE_SIZE,
    })
    return (
        <div>
            <div className="flex flex-row justify-between mb-10">
                <h1 className="font-bold text-3xl">Event organizer</h1>
                <Link color="success" href="/addevent" isBlock> <IconPlusCircle className="mr-2"/> Add event</Link>
            </div>
            
            <CardGrid items={items} />
            {currentPage <= totalPages && (
                <PaginationComp page={currentPage} totalPages={totalPages} />
            )}
        </div>
    )
}
