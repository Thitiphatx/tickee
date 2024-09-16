import Searchbar from "@/components/searchbar";
import { notFound } from "next/navigation";
import { getRole, getSelectedUser } from "./fetch";
import UserTable from "@/components/userTable";


export default async function AllUser() {
    let input = ""
    const resUser = await getSelectedUser(input);
    const resRole = await getRole();
    if (!resUser || !resRole) {
        notFound()
    }
    const selectedUser = resUser;
    const allRole = resRole;

    return (
        <div className="h-2/3">
            <div className="w-full">
                <Searchbar />
            </div>
            <UserTable data={selectedUser} role={allRole}></UserTable>
 
        </div>
    )
}