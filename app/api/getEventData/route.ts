// app/api/getEventData/route.ts (for Next.js 13)
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma'; // Adjust the import according to your project structure

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const eventId = searchParams.get('event_id');

    if (!eventId) {
        return NextResponse.json({ error: 'Event ID is required' }, { status: 400 });
    }

    try {
        const eventData = await prisma.event.findUnique({
            where: { event_id: Number(eventId) }, // Adjust field name as necessary
            include: {
                Seat_Type: true, // Include related seat types if needed
            },
        });

        if (!eventData) {
            return NextResponse.json({ error: 'Event not found' }, { status: 404 });
        }

        return NextResponse.json(eventData);
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'An error occurred while fetching the event data' }, { status: 500 });
    }
}
