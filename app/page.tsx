import { prisma } from '@/prisma/seed';
import ImageSlider from '../components/slider'
import CardSwiper from '@/components/CardSwiper';
import { RoleAvailable } from '@/types/data_type';
import { redirectingByRole } from '@/utils/function';
import { getCurrentSession } from '@/utils/getCurrentSession';

export const revalidate = 0
export default async function Home() {
    const session = await getCurrentSession();

    if (session?.user.role == RoleAvailable.Admin && session) {
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
                    gt: today,
            }
        },
        take: 6,
        include: {
            event_type: true
        }
    })

    const enter = await prisma.event.findMany({
        where: {
            event_type: {
                et_name: "Entertainment"
            },
            event_last_date: {
                    gt: today,
            }
        },
        take: 6,
        include: {
            event_type: true
        }
    })

    const sport = await prisma.event.findMany({
        where: {
            event_type: {
                et_name: "Sport"
            },
            event_last_date: {
                    gt: today,
            }
        },
        take: 6,
        include: {
            event_type: true
        }
    })

    const esport = await prisma.event.findMany({
        where: {
            event_type: {
                et_name: "Esport"
            },
            event_last_date: {
                    gt: today,
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
            <CardSwiper title="Entertainment" items={enter} fullPage="entertainment" />
            <CardSwiper title="Sport" items={sport} fullPage="sport" />
            <CardSwiper title="E-Sport" items={esport} fullPage="e-sport" />
        </div>
    );
}
