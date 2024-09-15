"use client"
import Graph from "@/components/graph";
import { Button } from "@nextui-org/button";
import { Receipt, Seat_Type } from "@prisma/client";
import { useRouter } from "next/navigation";



export default function Admin() {
    const router = useRouter();
    return (
        <div className="h-2/3">
            <Graph />            
            <div className="flex justify-around">
                <Button color="primary" size="lg" className="w-1/5" onClick={()=> router.push(`/admin/alluser`)}>get users</Button>
                <Button color="primary" size="lg" className="w-1/5" onClick={()=> router.push(`/admin/allevent`)}>get event</Button>
                {/* <Button color="primary" size="lg" className="w-full" >verification form</Button> */}
            </div>
        </div>
    )
}