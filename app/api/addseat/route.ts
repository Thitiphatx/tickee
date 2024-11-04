import { NextResponse } from "next/server";
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(req: Request) {
    const body = await req.json();
    
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
export async function PUT(req: Request) {
    const body = await req.json();
    

    const {
        seat_id,           // Used to identify the seat to update
        seat_name,
        seat_price,
        seat_max,
        seat_create_date,
        seat_due_date,
        event_seat_id,
        sd_max             // For updating the Seat_Dispatch record
    } = body;
    

    if (!seat_id) {
        console.error("Error: seat_id is undefined.");
        return NextResponse.json({ error: 'Invalid seat_id' }, { status: 400 });
    }

    try {
        
        const updatedSeat = await prisma.seat_Type.update({
            where: {
                seat_id: seat_id, // Identify the seat to update
            },
            data: {
                seat_name: seat_name,
                seat_price: seat_price,
                seat_create_date: seat_create_date,
                seat_due_date: seat_due_date,
                event_seat_id: event_seat_id,
                Seat_Dispatch: {
                    update: {
                        sd_max: seat_max || sd_max, // Update seat_max in Seat_Dispatch if provided
                    }
                }
            },
            include: {
                Seat_Dispatch: true
            }
        });
        return NextResponse.json(updatedSeat, { status: 200 }); // Respond with the updated seat

    } catch (error) {
        console.error('Error updating seat:', error);
        return NextResponse.json({ error: 'Failed to update seat' }, { status: 500 });
    }
}