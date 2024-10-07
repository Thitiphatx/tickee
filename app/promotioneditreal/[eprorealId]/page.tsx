import EditPromotionreal from '@/components/EditPromotionreal';
import { PrismaClient } from '@prisma/client';

interface IParams {
    eprorealId?: string;
}

export default async function PromotionPage({ params }: { params: IParams }) {
  const prisma = new PrismaClient();
  const detail = await prisma.seat_Type.findUnique({
    include: {
      event_seat: true,
      Promotion: true,
    },
    where: {
      seat_id: parseInt(params.eprorealId || '0'), 
    }
  });

  const promotionTypes = await prisma.promotion_Type.findMany({
    select: {
      pt_id: true,
      pt_name: true, // Assuming you have pt_name as the type's name
    },
  });

  const detailData = detail ? {
    seat_id: detail.seat_id,
    seat_name: detail.seat_name,
    promotion: detail.Promotion,
    event: detail.event_seat,
  } : null;
  if (!detailData){
    return(
        <div>
            <h1>Seat's Promotion not found</h1>
            <p>The seat with ID {params.eprorealId} does not exist.</p>
        </div>
    )
  }
  const promotionTypeOptions = promotionTypes.map((type) => ({
    id: type.pt_id,
    name: type.pt_name,
  }));
  
  // Now you can access event details from the detail object
  console.log(detailData)
  console.log(params.eprorealId)

  return (
    <div>

      <h1>{params.eprorealId}</h1>
      <EditPromotionreal events={[detailData]} promotionTypes={promotionTypeOptions}/>
    </div>
  );
}
