import Promotion from '@/components/Promotion';
import { PrismaClient } from '@prisma/client';

export default async function PromotionPage() {
  const prisma = new PrismaClient();
  const events = await prisma.event.findMany();


  console.log(events)
  // Map the events to match the expected Event interface if necessary
  const formattedEvents = events.map(event => ({
    event_id: event.event_id,
    event_name: event.event_name,
    event_intro: event.event_intro,
    event_images: event.event_images,
    event_start_date: event.event_start_date,
    event_last_date: event.event_last_date,
    event_location: event.event_location, // Ensure this matches your type
  }));

  return (
    <div>
      <h1>All Event</h1>
      <Promotion events={formattedEvents} />
      <h1>All Events that have been promotions</h1>
    </div>
  );
}
