import UserTable from "@/components/admin/userTable";
import { getCurrentSession } from "@/utils/getCurrentSession";
import { RoleAvailable } from "@/types/data_type";
import { redirectingByRole } from "@/utils/function";

export default async function AllUser() {
    const session = await getCurrentSession();
    if (session?.user.role != RoleAvailable.Admin || !session) {
        redirectingByRole(session)
    }

    return (
        <div className="flex flex-col w-full h-2/3">
            <UserTable />
        </div>
    )
}