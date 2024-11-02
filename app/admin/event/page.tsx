
import AdminEventCard from "@/components/admin/adminEventCard";
import { getCurrentSession } from "@/utils/getCurrentSession";
import { RoleAvailable } from "@/types/data_type";
import { redirectingByRole } from "@/utils/function";

export default async function AllEvent() {
    const session = await getCurrentSession();
    if (session?.user.role != RoleAvailable.Admin || !session) {
        redirectingByRole(session)
    } 
    return (
        <div className="flex flex-wrap gap-5 h-2/3">
            <AdminEventCard />
        </div>
    )
}