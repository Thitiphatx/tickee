"use server";
import EditEventForm from '@/components/EditEventForm';
import React, { useState, useEffect } from 'react';
import { PrismaClient } from '@prisma/client';
import { RoleAvailable } from '@/types/data_type';
import { redirectingByRole } from '@/utils/function';
import { getCurrentSession } from '@/utils/getCurrentSession';

interface IParams {
    eventId?: string; // Event ID to edit promotions
}

export default async function editevent({ params }: { params: IParams }) {
    const session = await getCurrentSession();

    if (session?.user.role != RoleAvailable.Organizer || !session) {
        redirectingByRole(session)
    }
    
    const prisma = new PrismaClient();
    let eventData, eventType;

    try {
        eventData = await prisma.event.findUnique({
            where: {
                event_id: parseInt(params.eventId || "0"), // Assuming event_id is of type integer
            },
            include: {
                event_type: true,
                Seat_Type: {
                    include: {
                        Seat_Dispatch: true,
                    }
                }
            },
        });

        eventType = await prisma.event_Type.findMany();
    } catch (error) {
        console.error('Error fetching event data:', error);
        return <div>Error fetching event data</div>;
    } finally {
        await prisma.$disconnect(); // Ensure the Prisma client is disconnected
    }

    // Handle case where event is not found
    if (!eventData) {
        return <div>Event not found</div>;
    }

    return (
        <div>
            {/* Pass the event_id as a number and eventData as a whole object */}
            <EditEventForm eventData={eventData} eventType={eventType} />
        </div>
    );
}
