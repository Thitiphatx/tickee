import { notFound } from "next/navigation";
import { getReturningOrder } from "./fetch";
import ReturnRequest from "@/components/admin/returnRequest";
import { RoleAvailable } from "@/types/data_type";
import { getCurrentSession } from "@/utils/getCurrentSession";
import { redirectingByRole } from "@/utils/function";

export default async function Returning() {
    const res = await getReturningOrder()
    const session = await getCurrentSession();
    if (session?.user.role != RoleAvailable.Admin || !session) {
        redirectingByRole(session)
    }
    if (!res) {
        notFound()
    }
    const orders = res
    return (
        <div className="flex flex-wrap gap-5 h-2/3">
            <ReturnRequest data={orders} />
        </div>
    )
}