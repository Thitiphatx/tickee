import Promotion from '@/components/Promotion';
import Promotion_seat from '@/components/Promotion_seat';
import { RoleAvailable } from '@/types/data_type';
import { redirectingByRole } from '@/utils/function';
import { getCurrentSession } from '@/utils/getCurrentSession';
import { Divider } from '@nextui-org/divider';
import { PrismaClient } from '@prisma/client';
export const revalidate = 0
export default async function PromotionPage() {
    const prisma = new PrismaClient();
    const session = await getCurrentSession();

    if (!session || session?.user.role != RoleAvailable.Organizer) {
        redirectingByRole(session)
        return
    }
    const userId = session?.user?.id;

    // Fetch all events created by the current user
    const events = await prisma.event.findMany({
        where: {
            producer_id: userId, // Filter by the current user's ID
        },
        include: {
            Seat_Type: { // Include Seat_Type and Promotions
                include: {
                    Promotion: true, // Include promotion details
                },
            },
        },
    });

    // Separate events into those with and without promotions
    const eventsWithPromotions = events.filter(event =>
        event.Seat_Type.some(seat => seat.Promotion) // Check if any seat has a promotion
    );

    const eventsWithSeatsNoPromotion = events.filter(event =>
        event.Seat_Type.some(seat => !seat.Promotion) // Check if any seat has no promotion
    );


    // Format events with promotions
    const formattedEventsWithPromotions = eventsWithPromotions.map(event => ({
        event_id: event.event_id,
        event_name: event.event_name,
        event_intro: event.event_intro,
        event_images: event.event_images,
        event_start_date: event.event_start_date,
        event_last_date: event.event_last_date,
        event_location: event.event_location,
        seats: event.Seat_Type.map(seat => ({
            seat_id: seat.seat_id,
            seat_name: seat.seat_name,
            seat_price: seat.seat_price,
            seat_create_date: seat.seat_create_date,
            seat_due_date: seat.seat_due_date,
            promotion: seat.Promotion, // Include promotion details for each seat
        })),
    }));

    // Format events without promotions
    const formattedEventsWithSeatsNoPromotion = eventsWithSeatsNoPromotion.map(event => ({
        event_id: event.event_id,
        event_name: event.event_name,
        event_intro: event.event_intro,
        event_images: event.event_images,
        event_start_date: event.event_start_date,
        event_last_date: event.event_last_date,
        event_location: event.event_location,
        seats: event.Seat_Type.map(seat => ({
            seat_id: seat.seat_id,
            seat_name: seat.seat_name,
            seat_price: seat.seat_price,
            seat_create_date: seat.seat_create_date,
            seat_due_date: seat.seat_due_date,
            hasPromotion: !!seat.Promotion // Add a flag indicating whether the seat has a promotion
        })), // Only seat details
    }));

    return (
        <div>
            <h1 className="font-bold text-3xl mb-10">Your Events</h1>
            <Promotion events={formattedEventsWithSeatsNoPromotion} />
            <Divider className="my-5"></Divider>
            <h1 className="font-bold text-3xl mb-10">Active promotion</h1>
            <Promotion_seat events={formattedEventsWithPromotions} />
        </div>
    );
}
