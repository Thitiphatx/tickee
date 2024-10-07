import Link from 'next/link';
import { PrismaClient } from '@prisma/client';

interface IParams {
  eproId?: string; // Event ID to edit promotions
}

export default async function editpromotion({ params }: { params: IParams }) {
  const prisma = new PrismaClient();

  // Ensure eproId is a valid number
  const eventId = parseInt(params.eproId || '0', 10);
  
  // Log the event ID
  console.log('Event ID:', eventId);

  // Fetch all seat types associated with the given event ID
  const allSeats = await prisma.seat_Type.findMany({
    where: {
      event_seat_id: eventId, // Use the correct field to filter
    },
    include: {
      Promotion: true, // Include promotion details if needed
    },
  });

  // Log the fetched seat types
  console.log('All Seats:', allSeats);

  return (
    <div>
      <h1>Promotion Management for Event ID: {eventId}</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {allSeats.length === 0 ? (
          <p>No seats found for this event.</p>
        ) : (
          allSeats.map(seat => (
            <Link href={`/promotioneditreal/${seat.seat_id}`} key={seat.seat_id}>
              <div className="p-4 border rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-200 cursor-pointer">
                <h2 className="text-lg font-bold">{seat.seat_name}</h2>
                <p className="text-gray-700">Price: ${seat.seat_price}</p>
                <p className="text-gray-600">Created on: {new Date(seat.seat_create_date).toLocaleString()}</p>
                <p className="text-gray-600">Due date: {new Date(seat.seat_due_date).toLocaleString()}</p>
                {seat.Promotion && (
                  <div className="mt-2">
                    <p className="font-semibold">Promotion:</p>
                    <p>Description: {seat.Promotion.pro_description}</p>
                    <p>Discount: {seat.Promotion.pro_discount}%</p>
                    <p>Start Date: {new Date(seat.Promotion.pro_start_date).toLocaleString()}</p>
                    <p>End Date: {new Date(seat.Promotion.pro_last_date).toLocaleString()}</p>
                  </div>
                )}
              </div>
            </Link>
          ))
        )}
      </div>
    </div>
  );
}
