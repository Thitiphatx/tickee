"use client"
import BusinessAdjustment from "@/components/admin/businessAdjustment";
import Graph from "@/components/admin/graph";
import { Button } from "@nextui-org/button";
import { Divider } from "@nextui-org/divider";
import { useRouter } from "next/navigation";

export default function Admin() {
    const router = useRouter();
    return (
        <div className="flex flex-col items-center h-fit pb-5 gap-10">
            <Graph />
            <div className="flex w-3/4 justify-around">
                <Button color="primary" variant="bordered" size="lg" className="w-1/4" onClick={() => router.push(`/admin/alluser`)}>User</Button>
                <Divider orientation="vertical" />
                <Button color="primary" variant="bordered" size="lg" className="w-1/4" onClick={() => router.push(`/admin/allevent`)}>Event</Button>
                <Divider orientation="vertical" />
                <Button color="primary" variant="bordered" size="lg" className="w-1/4" >Return Request</Button>
            </div>
            <BusinessAdjustment />
        </div>
    )
}