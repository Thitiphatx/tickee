"use server"
import CardGrid from "@/components/CardGrid";
import PaginationComp from "@/components/PaginationComp";
import { PAGE_SIZE } from "@/config/site";
import { prisma } from "@/prisma/seed";

export default async function Concert({ searchParams }: { searchParams: { page?: string } }) {
    const currentPage = parseInt(searchParams.page || '1', 10);
    const totalEvents = await prisma.event.count({
        where: {
            event_type: {
                et_name: "Concert",
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
                et_name: "Concert",
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
            <h1 className="font-bold text-3xl mb-10">Concert</h1>
            <CardGrid items={data} />
            {currentPage <= totalPages && (
                <PaginationComp page={currentPage} totalPages={totalPages} />
            )}
            
        </div>
    )
};
