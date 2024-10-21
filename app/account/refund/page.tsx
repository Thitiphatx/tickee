
import RefundTable from "@/components/account/AccountRefund";
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
            rec_status: 3, // Only fetch receipts with rec_status 3
        },
        include: {
            rec_seat: true, // Include other relevant relations if needed
        }
    });


    // Fetch user data (optional, based on your needs)
    const userData = await prisma.user.findUnique({
        where: {
            id: session.user.id, // Fetch user by session ID
        },
    });

    // For security, you might want to nullify sensitive information like the password
    if (userData) {
        userData.password = null;
    }

    return (
        <div>
            <RefundTable receipts={userReceiptsWithStatus3} />
        </div>
    );
}
