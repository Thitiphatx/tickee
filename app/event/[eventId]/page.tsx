
import Selector from "@/components/selector";
import { Button } from "@nextui-org/button";
import { Card, CardBody, CardHeader } from "@nextui-org/card";
import { Chip } from "@nextui-org/chip";
import { Image } from "@nextui-org/image";
import TicketInformation from "./TicketInformation";
import { PrismaClient } from '@prisma/client';
import Eventpage from "@/components/Eventpage";

export default async function EventLanding({ params }: { params: { eventId: string }}) {
    console.log(params.eventId)
    const prisma = new PrismaClient();
    const details = await prisma.event.findFirst({where:{event_id:parseInt(params.eventId)}})
    console.log("testtt",details)
    return(
        <div>
             {/* <h1 className="page-heading">Concerts</h1> */}
            <Eventpage items={details}/>
        </div>
    )
}
