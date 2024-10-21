"use server"

import { prisma } from '@/prisma/seed';
import ImageSlider from '../components/slider'
import CardSwiper from '@/components/CardSwiper';


export default async function Home() {
    const today = new Date();
    const latest = await prisma.event.findMany({
        where: {
            event_last_date: {
                gt: today, // Filter events where event_last_date is greater than today
            },
        },
        take: 10
    })
    const concert = await prisma.event.findMany({
        where: {
            event_type: {
                et_name: "Concert"
            },
            event_last_date: {
                gt: today, // Filter events where event_last_date is greater than today
            }
        },
        take: 6,
        include: {
            event_type: true
        }
    })
    return (
        <div className="space-y-5">
            <ImageSlider/>
            <CardSwiper title="Latest Event" items={latest} />
            <CardSwiper title="Concert" items={concert} fullPage="concert" />
        </div>
    );
}
