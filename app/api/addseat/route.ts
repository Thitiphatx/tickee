import { NextResponse } from "next/server";
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(req: Request) {
    const body = await req.json();
    console.log("Incoming data:", body);
    const {
        seat_name,
        seat_price,
        seat_max,
        seat_create_date,
        seat_due_date,
        event_seat_id
    } = body;

    try {
        const newseat = await prisma.seat_Type.create({
            data: {
                seat_name: seat_name,
                seat_price: seat_price,
                seat_create_date: seat_create_date,
                seat_due_date: seat_due_date,
                event_seat_id: event_seat_id,
                Seat_Dispatch: {
                    create: {
                        sd_max: seat_max, // Example data for sd_max
                    }
                }
            },
            include: {
                Seat_Dispatch: true
            }
        });
        return NextResponse.json(newseat, { status: 201 }); // Respond with the created event

    }
    catch (error) {
        console.error('Error creating event:', error);
        return NextResponse.json({ error: 'Failed to create event' }, { status: 500 });
    }
}