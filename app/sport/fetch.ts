import { prisma } from "@/lib/prisma";

export async function getSportEvent() {
    let output;
    try {
        output = await prisma.event.findMany({
            include:{
                event_type:true,
                producer:true,
            },where: {
                event_type:{
                    et_name:"Sport"
                }
            },orderBy : {
                event_last_date:"asc"
            }
        })
    } catch (error) {
        console.log("getSportEvent Error")
        return null
    }
    return output
}