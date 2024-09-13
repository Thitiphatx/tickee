import { PrismaClient } from '@prisma/client';
import Eventpage from "@/components/Eventpage";

export default async function EventLanding({ params }: { params: { eventId: string }}) {
    console.log(params.eventId)
    const prisma = new PrismaClient();
    const details = await prisma.event.findFirst({where:{event_id:parseInt(params.eventId)}})
    console.log("testtt",details)
    return(
        <div>
             <h1 className="page-heading">Concerts</h1>
            <Eventpage eventDetails={details}/>
        </div>
    )
}
