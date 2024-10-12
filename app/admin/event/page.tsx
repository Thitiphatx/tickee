import { getSelectedEvent } from "./fetch";
import { notFound } from "next/navigation";
import AdminEventCard from "@/components/admin/adminEventCard";
import { getCurrentSession } from "@/utils/getCurrentSession";
import { RoleAvailable } from "@/types/data_type";
import { redirectingByRole } from "@/utils/function";

export default async function AllEvent() {
    let input = ""
    const session = await getCurrentSession();
    if (session?.user.role != RoleAvailable.Admin || !session) {
        redirectingByRole(session)
    } 
    const res = await getSelectedEvent(input);
    if (!res) {
        notFound()
    }
    const foundedEvent = res

    return (
        <div className="flex flex-wrap gap-5 h-2/3">
            <AdminEventCard data={foundedEvent}/>
        </div>
    )
}