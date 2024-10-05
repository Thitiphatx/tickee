import { prisma } from '@/prisma/seed';
export default async function Show1() {
    const eventName = 'Concert A';
    const result = await prisma.event.findMany({
        where: { event_name: eventName },
        relationLoadStrategy: "join",
        select: {
            event_name: true,
            Seat_Type: { // Corrected to match the schema
                select: {
                    seat_name: true,
                    Seat_Dispatch: { // Corrected to match the schema
                        select: {
                            sd_max: true,
                            sd_current: true,
                        },
                    },
                },
            },
        },
    });

    const receipts = await prisma.receipt.findMany({
        select: {
          rec_id: true, // Include rec_id
          rec_date: true,
          rec_quantity: true,
          rec_customer: {
            select: {
              name: true,
            },
          },
          rec_seat: {
            select: {
              seat_name: true,
              seat_price: true,
              event_seat: {
                select: {
                  event_name: true,
                  event_type: {
                    select: {
                      et_name: true,
                    },
                  },
                },
              },
            },
          },
        },
      });

      const result3 = await prisma.event.findMany({
        where: {
          Seat_Type: {
            some: {
              Promotion: {
                // Ensure there's at least one promotion associated with the seat type
              },
            },
          },
        },
        select: {
          event_name: true,
          Seat_Type: {
            select: {
              seat_name: true,
              seat_price: true,
              Promotion: {
                select: {
                  pro_description: true,
                  pro_type: {
                    select: {
                      pt_name: true,
                    },
                  },
                },
              },
            },
          },
        },
      });
      
    return (
        <div>
        <h1>Seat Availability for {result.length > 0 ? result[0].event_name : 'Concert A'}</h1>
        <table className='border-1 bg-foreground-200'>
          <thead className='border-1 p-20'>
            <tr>
              <th className='p-4'>Event Name</th>
              <th className='p-4'>Seat Name</th>
              <th className='p-4'>Max Seats</th>
              <th className='p-4'>Current Seats</th>
            </tr>
          </thead>
          <tbody>
            {result.map((event, index) => (
              // Map through Seat_Type for each event
              event.Seat_Type.map((seatType, index1) => (
                <tr key={`${index}-${index1}`} className='text-center'>
                  {index1 === 0 && <td rowSpan={event.Seat_Type.length}>{event.event_name}</td>} {/* Row span for event name */}
                  <td>{seatType.seat_name}</td>
                  <td>{seatType.Seat_Dispatch?.sd_max}</td>
                  <td>{seatType.Seat_Dispatch?.sd_current}</td>
                </tr>
              ))
            ))}
          </tbody>
        </table>
        <h1>Receipt Details</h1>
      <table className='border-1 bg-foreground-200'>
        <thead className='border-1 p-20'>
          <tr>
            <th className='p-4'>Pro_ID</th> {/* Added Receipt ID column */}
            <th className='p-4'>Customer Name</th>
            <th className='p-4'>Event Name</th>
            <th className='p-4'>Event Type</th>
            <th className='p-4'>Seat Name</th>
            <th className='p-4'>Seat Price</th>
            <th className='p-4'>Quantity</th>
          </tr>
        </thead>
        <tbody>
          {receipts.map((receipt) => (
            <tr key={receipt.rec_id} className='text-center'>
              <td>{receipt.rec_id}</td> {/* Display Receipt ID */}
              <td>{receipt.rec_customer.name}</td>
              <td>{receipt.rec_seat.event_seat.event_name}</td>
              <td>{receipt.rec_seat.event_seat.event_type.et_name}</td>
              <td>{receipt.rec_seat.seat_name}</td>
              <td>{receipt.rec_seat.seat_price}</td>
              <td>{receipt.rec_quantity}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <h1>Event Seat Information</h1>
      <table className='border-1 bg-foreground-200'>
        <thead className='border-1 p-20'>
          <tr>
            <th className='p-10'>Event Name</th>
            <th className='p-10'>Seat Name</th>
            <th className='p-10'>Seat Price</th>
            <th className='p-10'>Promotion Description</th>
            <th className='p-10'>Promotion Type</th>
          </tr>
        </thead>
        <tbody>
          {result3.map((event) => (
            event.Seat_Type.length > 0 ? (
              event.Seat_Type.map((seatType, index) => (
                <tr key={index} className='text-center'>
                  {index === 0 && (
                    <td rowSpan={event.Seat_Type.length}>{event.event_name}</td>
                  )}
                  <td>{seatType.seat_name}</td>
                  <td>{seatType.seat_price}</td>
                  <td>{seatType.Promotion?.pro_description || 'N/A'}</td>
                  <td>{seatType.Promotion?.pro_type.pt_name || 'N/A'}</td>
                </tr>
              ))
            ) : null // This will not render anything for events without seat types
          ))}
        </tbody>
      </table>
      </div>
        
    );
}
