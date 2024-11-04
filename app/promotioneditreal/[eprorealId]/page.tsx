import EditPromotionreal from '@/components/EditPromotionreal';
import { RoleAvailable } from '@/types/data_type';
import { redirectingByRole } from '@/utils/function';
import { getCurrentSession } from '@/utils/getCurrentSession';
import { PrismaClient } from '@prisma/client';

interface IParams {
  eprorealId?: string;
}
export const revalidate = 0
export default async function PromotionPage({ params }: { params: IParams }) {
  const prisma = new PrismaClient();
  const session = await getCurrentSession();

  if (!session || session?.user.role != RoleAvailable.Organizer) {
    redirectingByRole(session)
    return
  }

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
        <h1>Seats Promotion not found</h1>
        <p>The seat with ID {params.eprorealId} does not exist.</p>
      </div>
    );
  }

  // Map the data to match the structure expected in EditPromotionreal
  if(!detail.Promotion){
    return(
      <div>
        No Promotion
      </div>
    )
  }
  const detailData: {
    event_id: number;
    event_name: string;
    pro_desc: string; // Changed to string
    pro_disc: number; // Changed to number
    start: string;
    end: string;
    seat_types: {
      seat_id: number;
      seat_name: string;
      seat_price: number;
    }[];
  } = {
    event_id: detail.event_seat.event_id,
    event_name: detail.event_seat.event_name,
    pro_desc: detail.Promotion?.pro_description || "", // Default to empty string
    pro_disc: detail.Promotion?.pro_discount || 0, // Default to 0
    start: detail.Promotion.pro_start_date.toISOString(),
    end: detail.Promotion.pro_last_date.toISOString(),
    seat_types: [
      {
        seat_id: detail.seat_id,
        seat_name: detail.seat_name,
        seat_price: detail.seat_price || 0,
      },
    ],
  };

  const promotionTypeOptions = promotionTypes.map((type) => ({
    id: type.pt_id,
    name: type.pt_name,
  }));
  // 
  console.log(detailData.seat_types[0].seat_id)


  console.log(promotionTypeOptions)

  return (
    <div>
      {/* <h1>{params.eprorealId}</h1> */}

      <EditPromotionreal events={[detailData]} promotionTypes={promotionTypeOptions} promotionId={detail?.Promotion?.pro_id} />
    </div>
  );
}
