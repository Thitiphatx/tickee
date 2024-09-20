import { PrismaClient } from '@prisma/client';
import Promotion from "@/components/Promotion"; // Adjust path as necessary

export default async function promotion_show() {
  const prisma = new PrismaClient();
  const events = await prisma.event.findMany();  // Fetch all events
  console.log(events);

  return (
    <div>
      <Promotion events={events}/> {/* Just render the component to see if it shows */}
    </div>
  );
}
