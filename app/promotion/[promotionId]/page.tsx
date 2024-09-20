import EditPromotion from '@/components/EditPromotion';
import { PrismaClient } from '@prisma/client';

interface IParams {
  promotionId?: string;
}

export default async function PromotionPage({ params }: { params: IParams }) {
  const prisma = new PrismaClient();
  
  // Fetch the event details
  const details = await prisma.event.findUnique({
    include: {
      event_type: true,
      Seat_Type: true, // Include seat types
    },
    where: {
      event_id: parseInt(params.promotionId || '0'), // Ensure event_id is a number
    },
  });

  // Map the details to match the Event interface
  const eventData = details ? {
    event_id: details.event_id,
    event_name: details.event_name,
    seat_types: details.Seat_Type, // Rename Seat_Type to seat_types
    // Add other fields as needed
  } : null;

  if (!eventData) {
    return (
      <div>
        <h1>Event Not Found</h1>
        <p>The event with ID {params.promotionId} does not exist.</p>
      </div>
    );
  }
  console.log(eventData)
  return (
    <div>
      <h1>Promotion Management for {eventData.event_name}</h1>
      {/* Pass the event as an array to match the expected props for EditPromotion */}
      <EditPromotion events={[eventData]} />
    </div>
  );
}
