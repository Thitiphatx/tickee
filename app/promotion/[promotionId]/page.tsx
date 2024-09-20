import EditPromotion from '@/components/EditPromotion';
import { PrismaClient } from '@prisma/client';

interface IParams{
  eventId?: string
}

export default async function PromotionPage({ params }: { params: IParams}) {
  const prisma = new PrismaClient();
  console.log("params", params)

  return (
    <div>
      {/* <h1>Promotion Management for {details.event_name}</h1> */}
      {/* <EditPromotion events={[details]} /> */}
    </div>
  );
}
