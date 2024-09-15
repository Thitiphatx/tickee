import Searchbar from "@/components/searchbar";
import { notFound } from "next/navigation";
import { getSelectedUser } from "./fetch";
import UserTable from "@/components/userTable";


export default async function AllUser() {
    let input = ""
    const res = await getSelectedUser(input);
    if (!res) {
        notFound()
    }
    const selectedUser = res;
    return (
        <div className="h-2/3">
            <div className="w-full">
                <Searchbar />
            </div>
            <UserTable data={selectedUser}></UserTable>
 
        </div>
    )
}