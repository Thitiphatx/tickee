"use client"
import BusinessAdjustment from "@/components/admin/businessAdjustment";
import Graph from "@/components/admin/graph";
import { RoleAvailable } from "@/types/data_type";
import { redirectingByRole } from "@/utils/function";
import { Button } from "@nextui-org/button";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Admin() {
    const router = useRouter();
    const [onLoad, setOnLoad] = useState<boolean>(true);
    const { data: session, status } = useSession();
    if ((session?.user.role != RoleAvailable.Admin || !session) && status != "loading") {
        redirectingByRole(session)
    } else if (onLoad) {
        setOnLoad(false)
    }
    return (
        <>
            {!onLoad && (
                <div className="flex flex-col items-center h-fit pb-5 gap-10">
                    <Graph />
                    <div className="flex flex-wrap min-w-52 gap-5 w-3/4 justify-center">
                        <Button color="primary" variant="ghost" size="lg" className="min-w-36 w-1/4 mx-5" onClick={() => router.push(`/admin/user`)}>User</Button>

                        <Button color="primary" variant="ghost" size="lg" className="min-w-36 w-1/4 mx-5" onClick={() => router.push(`/admin/event`)}>Event</Button>

                        <Button color="primary" variant="ghost" size="lg" className="min-w-36 w-1/4 mx-5" onClick={() => router.push(`/admin/returning`)}>Return Request</Button>
                    </div>
                    <BusinessAdjustment />
                </div>
            )}
        </>

    )
}