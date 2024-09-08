import { prisma } from "@/lib/prisma";

export async function getEntertainmentEvent() {
    let output;
    try {
        output = await prisma.event.findMany({
            include:{
                event_type:true,
                producer:true,
            },where: {
                event_type:{
                    et_name:"Entertainment"
                }
            },orderBy : {
                event_last_date:"asc"
            }
        })
    } catch (error) {
        console.log("getEntertainmentEvent Error")
        return null
    }
    return output
}