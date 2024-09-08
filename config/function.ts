import { prisma } from "@/lib/prisma";

export async function searchEventwithTag(input:string) {
    let output;
    try {
        output = await prisma.event.findMany({
            include:{
                event_type:true,
                producer:true,
            },where: {
                event_type:{
                    et_name:input
                }
            },orderBy : {
                event_last_date:"asc"
            }
        })
    } catch (error) {
        console.log("searchEventwithTag Error")
        return null
    }
    return output
}

export async function searchEventwithName(input:string) {
    let output;
    try {
        output = await prisma.event.findMany({
            include:{
                event_type:true,
                producer:true,
            },where: {
                event_name:{
                    contains:input
                }
            },orderBy : {
                event_last_date:"asc"
            }
        })
    } catch (error) {
        console.log("searchEventwithName Error")
        return null
    }
    return output
}