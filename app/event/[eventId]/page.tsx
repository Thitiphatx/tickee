import Eventpage from "@/components/Eventpage";
import { prisma } from '@/lib/prisma';

export default async function EventLanding({ params }: { params: { eventId: string }}) {
    const details = await prisma.event.findFirst( {
        include: {
            event_type: true,
            Seat_Type: {
                include: {
                    Seat_Dispatch: true,
                    Promotion:{
                        include:{
                            pro_type:true
                        }
                    }
                }
            }
        },
        where:  {
            event_id: parseInt(params.eventId),
        }
    })
    if (details)
    return(
        <div>
            <Eventpage eventDetails={details}/>
        </div>
    )
    else {
        return (
            <>wow</>
        )
    }
}