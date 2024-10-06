"use client"
import Graph from "@/components/admin/graph";
import { Button } from "@nextui-org/button";
import { Divider } from "@nextui-org/divider";
import { useRouter } from "next/navigation";

export default function Admin() {
    const router = useRouter();
    return (
        <div className="h-fit pb-5">
            <Graph />            
            <div className="flex w-1/2 justify-around">
                <Button color="primary" size="lg" className="w-1/3" onClick={()=> router.push(`/admin/alluser`)}>User</Button>
                <Divider orientation="vertical"/>
                <Button color="primary" size="lg" className="w-1/3" onClick={()=> router.push(`/admin/allevent`)}>Event</Button>
                {/* <Button color="primary" size="lg" className="w-full" >verification form</Button> */}
            </div>
            <div>
                <h1>upload banner</h1>
                <h1>Fee data</h1>
            </div>
        </div>
    )
}