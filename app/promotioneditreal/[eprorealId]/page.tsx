import EditPromotionreal from '@/components/EditPromotionreal';
import { PrismaClient } from '@prisma/client';

interface IParams {
  eprorealId?: string;
}

export default async function PromotionPage({ params }: { params: IParams }) {
  const prisma = new PrismaClient();
  
  const detail = await prisma.seat_Type.findUnique({
    include: {
      event_seat: true, // Assuming this holds event details
      Promotion: true,
    },
    where: {
      seat_id: parseInt(params.eprorealId || '0'),
    },
  });

  const promotionTypes = await prisma.promotion_Type.findMany({
    select: {
      pt_id: true,
      pt_name: true,
    },
  });

  if (!detail) {
    return (
      <div>
        <h1>Seat's Promotion not found</h1>
        <p>The seat with ID {params.eprorealId} does not exist.</p>
      </div>
    );
  }

  // Map the data to match the structure expected in EditPromotionreal
  const detailData = {
    event_id: detail.event_seat.event_id, // Assuming event_seat contains event details
    event_name: detail.event_seat.event_name,
    seat_types: [
      {
        seat_id: detail.seat_id,
        seat_name: detail.seat_name,
        seat_price: detail.seat_price || 0, // Assuming seat_price is a valid field
      },
    ],
  };

  const promotionTypeOptions = promotionTypes.map((type) => ({
    id: type.pt_id,
    name: type.pt_name,
  }));
  // console.log(detailData.seat_types[0].seat_id)

  return (
    <div>
      <h1>{params.eprorealId}</h1>
      <EditPromotionreal events={[detailData]} promotionTypes={promotionTypeOptions} promotionId={detail?.Promotion?.pro_id}/>
    </div>
  );
}
