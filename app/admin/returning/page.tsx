import { notFound } from "next/navigation";
import AdminEventCard from "@/components/admin/adminEventCard";
import { getReturningOrder } from "./fetch";
import ReturnRequest from "@/components/admin/returnRequest";

export default async function Returning() {
    const res = await getReturningOrder()
    if (!res) {
        notFound()
    }
    const orders = res
    return (
        <div className="flex flex-wrap gap-5 h-2/3">
            <ReturnRequest data={orders}/>
        </div>
    )
}