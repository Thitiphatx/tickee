import EditPromotion from '@/components/EditPromotion';
import { PrismaClient } from '@prisma/client';

export default async function PromotionPage() {
  const prisma = new PrismaClient();
  const events = await prisma.event.findMany();  // Fetch all events

  return (
    <div>
      <h1>Promotion Management</h1>
      <EditPromotion events={events} />
    </div>
  );
}
