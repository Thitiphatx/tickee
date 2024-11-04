import { prisma } from "@/prisma/seed";
import { IconCheckCircleFill, IconCloseCircle } from "@/styles/icon";
import { getCurrentSession } from "@/utils/getCurrentSession";
import Link from "next/link";
import { redirect } from "next/navigation";

interface ReceiptParams extends Record<string, unknown> {
  receiptId: string;
}

export default async function CheckReceipt({ params }: { params: ReceiptParams }) {
  const session = await getCurrentSession();
  if (!session || session?.user.role == "user") {
    redirect("/")
  }
  if (!('receiptId' in params)) {
      throw new Error("Missing required param 'receiptId'");
  }

  try {
      // Attempt to convert receiptId to integer
      const receiptId = parseInt(params.receiptId);
      
      if (isNaN(receiptId)) {
          throw new Error(`Invalid receipt ID '${params.receiptId}'`);
      }

      const result = await prisma.receipt.findFirst({
          where: {
              rec_id: receiptId,
          },
      });

      if (!result) {
          return (
              <div className="w-full min-h-1.5 flex flex-col justify-center items-center">
                  <IconCloseCircle color="#F31260" width="5rem" height="5rem" />
                  <h5 className="text-center mt-5">No receipt found</h5>
              </div>);
      }

      return (
          <>
              <div className="w-full min-h-1.5 flex flex-col justify-center items-center">
                  <IconCheckCircleFill color="#17C964" width="5rem" height="5rem"/>
                  <h5 className="text-center mt-5">Receipt correct</h5>
                  <p>ID: {result.rec_id}</p>
              </div>
          </>
       );
   } catch (error) {
       // Handle specific error messages or display generic message based on context requirements.
       return (
           <div className="w-full min-h-1.5 flex flex-col justify-center items-center">
               <IconCloseCircle color="#F31260" width="5rem" height="5rem"/>
               <h5 className="text-center mt-5">An unexpected error occurred.</h5>
           </div>)
   }
}