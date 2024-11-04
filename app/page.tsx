import { prisma } from '@/prisma/seed';
import ImageSlider from '../components/slider'
import CardSwiper from '@/components/CardSwiper';
import { RoleAvailable } from '@/types/data_type';
import { redirectingByRole } from '@/utils/function';
import { getCurrentSession } from '@/utils/getCurrentSession';

export const revalidate = 0
export default async function Home() {
    const session = await getCurrentSession();

    if (session?.user.role != RoleAvailable.User && session) {
        redirectingByRole(session)
        return
    }

    const today = new Date();
    const latest = await prisma.event.findMany({
        where: {
            event_last_date: {
                gt: today,
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
    const slideShow = await prisma.admin_Data.findFirst();
    return (
        <div className="space-y-5">
            <ImageSlider image_item={slideShow?.banner_images ?? []}/>
            <CardSwiper title="Latest Event" items={latest} />
            <CardSwiper title="Concert" items={concert} fullPage="concert" />
        </div>
    );
}
