import { prisma } from "@/lib/prisma";

export async function getConcertEvent() {
    let output;
    try {
        output = await prisma.event.findMany({
            include:{
                event_type:true,
                producer:true,
            },where: {
                event_type:{
                    et_name:"Concert"
                }
            },orderBy : {
                event_last_date:"asc"
            }
        })
    } catch (error) {
        console.log("getConcertEvent Error")
        return null
    }
    return output
}