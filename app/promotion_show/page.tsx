import Promotion from '@/components/Promotion';
import Promotion_seat from '@/components/Promotion_seat';
import { PrismaClient } from '@prisma/client';

export default async function PromotionPage() {
  const prisma = new PrismaClient();

  // Fetch all events
  const events = await prisma.event.findMany();

  // Fetch events that have promotions
  const eventsWithoutPromotions = await prisma.event.findMany({
    where: {
      Seat_Type: {
        some: {
          Promotion: null,  // Fetch seats that don't have a promotion
        },
      },
    },
    include: {
      Seat_Type: true,  // Include seat details in the result
    },
  });
  const eventsWithPromotions = await prisma.event.findMany({
    where: {
      Seat_Type: {
        some: {
          Promotion: {
            // Here, we check that a promotion exists by ensuring pro_id is not null
            pro_id: { not: undefined },
          },
        },
      },
    },
    include: {
      Seat_Type: {
        include: {
          Promotion: true,  // Include promotion details in the result
        },
      },
    },
  });

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
      promotion: seat.Promotion,  // Include promotion details for each seat
    })),
  }));

  // Format events
  const formattedEvents = events.map(event => ({
    event_id: event.event_id,
    event_name: event.event_name,
    event_intro: event.event_intro,
    event_images: event.event_images,
    event_start_date: event.event_start_date,
    event_last_date: event.event_last_date,
    event_location: event.event_location,
  }));

  // Format events with promotions
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
      <h1>All Events</h1>
      <Promotion events={formattedEvents} />

      <h1>Events without Promotions</h1>
      <Promotion events={formattedEventsWithoutPromotions} />

      <h1>Events with Promotions (EDIT ZONE)</h1>
      <Promotion_seat events={formattedEventsWithPromotions} />
    </div>
  );
}
