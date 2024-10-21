import { prisma } from '@/prisma/seed';
import ImageSlider from '../components/slider'
import CardSwiper from '@/components/CardSwiper';

export const revalidate = 0
export default async function Home() {
    const latest = await prisma.event.findMany({
        take: 10
    })
    const concert = await prisma.event.findMany({
        where: {
            event_type: {
                et_name: "Concert"
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
