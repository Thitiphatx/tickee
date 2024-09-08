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

export async function getBannerImages() {
    let output;
    try {
        output = await prisma.admin_Data.findFirst({
            select:{
                banner_images:true
            }
        })
    } catch (error) {
        console.log("getBannerImages Error")
        return null
    }
    return output
}

export async function updateBannerImages(data:string[]) {
    let output;
    try {
        output = getBannerImages()
    } catch (error) {
        console.log("updateBannerImages Error")
        return null
    }
    try {
        const updateData = await prisma.admin_Data.update({
            where: {
                ad_id:1
            },
            data: {
                banner_images: data
            }
        })
    } catch (error) {
        
    }
    return output
}