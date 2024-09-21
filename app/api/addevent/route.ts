// app/api/addevent/route.ts

import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(req: Request) {

    const body = await req.json();
    console.log("Incoming data:", body);
    const {
        event_name,
        event_intro,
        event_description,
        event_images,
        event_start_date,
        event_last_date,
        event_location,
        event_seat_per_order,
        producer_id,
        event_type_id,
    } = body;
    try {
        const newEvent = await prisma.event.create({
            data: {
                event_name: event_name,
                event_intro: event_intro,
                event_description: event_description,
                event_images: event_images,
                event_start_date: new Date(event_start_date),
                event_last_date: new Date(event_last_date),
                event_location: event_location,
                event_seat_per_order: event_seat_per_order,
                producer_id: producer_id,
                event_type_id: event_type_id,
            },
        });

        return NextResponse.json(newEvent, { status: 201 }); // Respond with the created event
    } catch (error) {
        console.error('Error creating event:', error);
        return NextResponse.json({ error: 'Failed to create event' }, { status: 500 });
    }
}
