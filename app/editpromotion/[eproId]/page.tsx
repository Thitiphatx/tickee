import Link from 'next/link';
import { Card, CardBody, CardFooter, CardHeader } from '@nextui-org/card';
import { Divider } from '@nextui-org/divider';
import { Button } from '@nextui-org/button';
import { RoleAvailable } from '@/types/data_type';
import { redirectingByRole } from '@/utils/function';
import { getCurrentSession } from '@/utils/getCurrentSession';
import { prisma } from '@/prisma/seed';

interface IParams {
    eproId?: string; // Event ID to edit promotions
}

export default async function editpromotion({ params }: { params: IParams }) {
  const session = await getCurrentSession();

  if (session?.user.role != RoleAvailable.Organizer || !session) {
      redirectingByRole(session)
  }

    // Ensure eproId is a valid number
    const eventId = parseInt(params.eproId || '0', 10);

    // Log the event ID


    // Fetch all seat types associated with the given event ID
    const allSeats = await prisma.seat_Type.findMany({
        where: {
            event_seat_id: eventId, // Use the correct field to filter
            NOT: {
                Promotion: null
            }
        },
        include: {
            Promotion: true, // Include promotion details if needed
        },
    });

    // Log the fetched seat types


    return (
        <div>
            <h1>Promotion Management for Event ID: {eventId}</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {allSeats.length === 0 ? (
                    <p>No seats found for this event.</p>
                ) : (
                    allSeats.map(seat => (
                        <Link href={`/promotioneditreal/${seat.seat_id}`} key={seat.seat_id}>
                            <Card>
                                <CardHeader className="flex flex-col items-start">
                                    <h2 className="text-lg font-bold">{seat.seat_name}</h2>
                                    <p className="text-primary-700">ราคา: <small>฿{seat.seat_price}</small></p>
                                    <p className="text-primary-600">ขายวันที่: <small>{new Date(seat.seat_create_date).toLocaleString()}</small></p>
                                    <p className="text-primary-600">ถึงวันที่: <small>{new Date(seat.seat_due_date).toLocaleString()}</small></p>
                                </CardHeader>
                                <Divider />
                                <CardBody>
                                    {seat.Promotion && (
                                        <div className="mt-2">
                                            <p className="font-bold">Promotion:</p>
                                            <p>รายละเอียด: <small>{seat.Promotion.pro_description}</small></p>
                                            <p>ลดราคา: <small>{seat.Promotion.pro_discount}%</small></p>
                                            <p>เริ่มวันที่: <small>{new Date(seat.Promotion.pro_start_date).toLocaleString()}</small></p>
                                            <p>ถึงวันที่: <small>{new Date(seat.Promotion.pro_last_date).toLocaleString()}</small></p>
                                        </div>
                                    )}
                                </CardBody>
                                <CardFooter>
                                    <Button color="primary" fullWidth>คลิกเพื่อแก้ไข</Button>
                                </CardFooter>
                            </Card>
                        </Link>
                    ))
                )}
            </div>
        </div>
    );
}
