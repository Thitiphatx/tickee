import Promotion from '@/components/Promotion';
import Promotion_seat from '@/components/Promotion_seat';
import { getCurrentSession } from '@/utils/getCurrentSession';
import { PrismaClient } from '@prisma/client';

export default async function PromotionPage() {
  const prisma = new PrismaClient();
  const session = await getCurrentSession(); // Server Session

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

  const eventsWithoutPromotions = events.filter(event =>
    event.Seat_Type.every(seat => !seat.Promotion) // Check if all seats have no promotions
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
  const formattedEventsWithoutPromotions = eventsWithoutPromotions.map(event => ({
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
    })), // Only seat details, no promotion since it's already filtered
  }));

  return (
    <div>
      <h1>Your Events Without Promotions</h1>
      <Promotion events={formattedEventsWithoutPromotions} />

      <h1>Your Events with Promotions (EDIT ZONE)</h1>
      <Promotion_seat events={formattedEventsWithPromotions} />
    </div>
  );
}
