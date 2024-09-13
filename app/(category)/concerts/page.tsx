//server
import { eventItems } from "@/config/site";
import { PrismaClient } from '@prisma/client';

import CardSwiper from "@/components/CardSwiper";


export default async function page() {
    const prisma = new PrismaClient();
    const concerts = await prisma.event.findMany();
    // console.log(concerts)
    return (
        <div>
            <h1 className="page-heading">Concerts</h1>
            <CardSwiper items={concerts} />
        </div>
    )
}
