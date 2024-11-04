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
            event_seat_id: eventId, // Filter by the specific event ID
            NOT: {
                Promotion: null // Exclude seats without promotions
            }
        },
        include: {
            Promotion: { // Include promotions associated with the seat types
                include: {
                    pro_type: true, // Include promotion type details
                }
            }
        }
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
                                            <p className="font-semibold">Promotion:</p>
                                            <p>Promotion type: {seat.Promotion.pro_type.pt_name}</p>
                                            <p>Description: {seat.Promotion.pro_description}</p>

                                            {seat.Promotion.pro_type_id === 2 ? ( // Check if promotion type is percentage
                                                <p>Discount: {seat.Promotion.pro_discount}%</p>
                                            ) : seat.Promotion.pro_type_id === 3 ? ( // Check if promotion type is fixed amount
                                                <p>Discount: {seat.Promotion.pro_discount} บาท</p>
                                            ) : null}

                                            <p>Start Date: {new Date(seat.Promotion.pro_start_date).toLocaleString()}</p>
                                            <p>End Date: {new Date(seat.Promotion.pro_last_date).toLocaleString()}</p>
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
