"use client"
import BusinessAdjustment from "@/components/admin/businessAdjustment";
import Graph from "@/components/admin/graph";
import { RoleAvailable } from "@/types/data_type";
import { redirectingByRole } from "@/utils/function";
import { Button } from "@nextui-org/button";
import { Divider } from "@nextui-org/divider";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Admin() {
    const router = useRouter();
    const [onLoad, setOnLoad] = useState<boolean>(true);
    const { data: session, status } = useSession();
    if (session?.user.role != RoleAvailable.Admin || !session) {
        redirectingByRole(session)
    }
    setOnLoad(false)
    return (
        <>
            {!onLoad && (
                <div className="flex flex-col items-center h-fit pb-5 gap-10">
                    <Graph />
                    <div className="flex w-3/4 justify-around">
                        <Button color="primary" variant="bordered" size="lg" className="w-1/4" onClick={() => router.push(`/admin/user`)}>User</Button>
                        <Divider orientation="vertical" />
                        <Button color="primary" variant="bordered" size="lg" className="w-1/4" onClick={() => router.push(`/admin/event`)}>Event</Button>
                        <Divider orientation="vertical" />
                        <Button color="primary" variant="bordered" size="lg" className="w-1/4" onClick={() => router.push(`/admin/returning`)}>Return Request</Button>
                    </div>
                    <BusinessAdjustment />
                </div>
            )}
        </>

    )
}