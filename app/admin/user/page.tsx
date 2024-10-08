import { notFound } from "next/navigation";
import { getSelectedUser } from "./fetch";
import UserTable from "@/components/admin/userTable";


export default async function AllUser() {
    let input = ""
    const resUser = await getSelectedUser(input);
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