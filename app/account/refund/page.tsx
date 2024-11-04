
import RefundTable from "@/components/account/AccountRefund";
import { IconFaceSadTear } from "@/components/icons";
import { prisma } from "@/prisma/seed";
import { getCurrentSession } from "@/utils/getCurrentSession";
import { redirect } from "next/navigation";

export default async function AccountProfile() {
    const session = await getCurrentSession();
    
    // Check if the session exists
    if (!session) {
        return <></>;
    }

    // Fetch user receipts with rec_status of 3
    const userReceiptsWithStatus3 = await prisma.receipt.findMany({
        where: {
            rec_customer_id: session.user.id, // Assuming the user ID is linked to receipts
        },
        include: {
            rec_seat: true, // Include other relevant relations if needed
        }
    });
    
    if (userReceiptsWithStatus3.length > 0) {
        return (
            <div>
                <RefundTable receipts={userReceiptsWithStatus3} />
            </div>
        );
    }
    return (
        <div className="w-full min-h-1.5 flex flex-col justify-center items-center">
            <IconFaceSadTear width="5rem" height="5rem" />
            <h5 className="text-center mt-5">No refunded receipts found.</h5>
        </div>
    )
}
