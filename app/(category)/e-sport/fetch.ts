import { prisma } from "@/lib/prisma";

export async function getESportEvent() {
    let output;
    try {
        output = await prisma.event.findMany({
            include:{
                event_type:true,
                producer:true,
            },where: {
                event_type:{
                    et_name:"E-Sport"
                }
            },orderBy : {
                event_last_date:"asc"
            }
        })
    } catch (error) {
        console.log("getESportEvent Error")
        return null
    }
    return output
}