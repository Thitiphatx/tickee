import Eventpage from "@/components/Eventpage";
import { prisma } from '@/lib/prisma';
import { RoleAvailable } from "@/types/data_type";
import { redirectingByRole } from "@/utils/function";
import { getCurrentSession } from "@/utils/getCurrentSession";

const today = new Date();
export default async function EventLanding({ params }: { params: { eventId: string }}) {

    const session = await getCurrentSession();

    if (session?.user.role == RoleAvailable.Admin) {
        redirectingByRole(session)
    }
    
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
            event_last_date: {
                gt: today, // Filter events where event_last_date is greater than today
            }
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
            <>This event is not existed</>
        )
    }
}