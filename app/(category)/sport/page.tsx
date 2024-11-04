"use server"
import CardGrid from "@/components/CardGrid";
import PaginationComp from "@/components/PaginationComp";
import { PAGE_SIZE } from "@/config/site";
import { prisma } from "@/prisma/seed";
import { RoleAvailable } from "@/types/data_type";
import { redirectingByRole } from "@/utils/function";
import { getCurrentSession } from "@/utils/getCurrentSession";

export default async function Sport({ searchParams }: { searchParams: { page?: string } }) {
    const currentPage = parseInt(searchParams.page || '1', 10);
    const session = await getCurrentSession();
    const today = new Date();
    if (session?.user.role != RoleAvailable.User && session) {
        redirectingByRole(session)
    }

    const totalEvents = await prisma.event.count({
        where: {
            event_type: {
                et_name: "Sport",
            },
            event_last_date: {
                gt: today,
            },
        },
    });

    const data = await prisma.event.findMany({
        include: {
            event_type: true,
            producer: true,
        },
        where: {
            event_type: {
                et_name: "Sport",
            },
            event_last_date: {
                gt: today,
            },
        },
        orderBy: {
            event_last_date: "asc",
        },
        skip: (currentPage - 1) * PAGE_SIZE,
        take: PAGE_SIZE,
    });

    const totalPages = Math.ceil(totalEvents / PAGE_SIZE);



    return (
        <div>
            <h1 className="font-bold text-3xl mb-10">Sport</h1>
            <CardGrid items={data} />
            {currentPage <= totalPages && (
                <PaginationComp page={currentPage} totalPages={totalPages} />
            )}
            
        </div>
    )
};
