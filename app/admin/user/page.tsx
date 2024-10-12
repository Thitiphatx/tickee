import { notFound } from "next/navigation";
import { getSelectedUser } from "./fetch";
import UserTable from "@/components/admin/userTable";
import { getCurrentSession } from "@/utils/getCurrentSession";
import { RoleAvailable } from "@/types/data_type";
import { redirectingByRole } from "@/utils/function";


export default async function AllUser() {
    let input = ""
    const resUser = await getSelectedUser(input);
    const session = await getCurrentSession();
    if (session?.user.role != RoleAvailable.Admin || !session) {
        redirectingByRole(session)
    } 
    if (!resUser) {
        notFound()
    }
    const selectedUser = resUser;

    return (
        <div className="h-2/3">
            <UserTable data={selectedUser}></UserTable>
 
        </div>
    )
}