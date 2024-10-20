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
export async function PUT(req: Request) {
    const body = await req.json();
    console.log("Incoming data for update:", body);
    
    
    const {
        event_id,           // Include the event_id to identify the event to update
        event_name,
        event_intro,
        event_description,
        event_images,
        event_start_date,
        event_last_date,
        event_location,
        event_seat_per_order,
        producer_id,         // If producer needs to be updated
        event_type_id,
    } = body;

    if (!event_id) {
        return NextResponse.json({ error: 'Event ID is required for updating an event' }, { status: 400 });
    }

    try {
        const updatedEvent = await prisma.event.update({
            where: {
                event_id: event_id, // Identify the event to update
            },
            data: {
                event_name: event_name,
                event_intro: event_intro,
                event_description: event_description,
                event_images: event_images,
                event_start_date: new Date(event_start_date),
                event_last_date: new Date(event_last_date),
                event_location: event_location,
                event_seat_per_order: event_seat_per_order,
                producer_id: producer_id || undefined,  // Update if provided
                event_type_id: event_type_id,
            },
        });

        return NextResponse.json(updatedEvent, { status: 200 }); // Respond with the updated event
    } catch (error) {
        console.error('Error updating event:', error);
        return NextResponse.json({ error: 'Failed to update event' }, { status: 500 });
    }
}