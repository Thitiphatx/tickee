import { Button } from "@nextui-org/button";
import { getSelectedEvent } from "./fetch";
import { notFound } from "next/navigation";
import { Card, CardBody } from "@nextui-org/card";
import AdminEventCard from "@/components/admin/adminEventCard";

export default async function AllEvent() {
    let input = ""
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