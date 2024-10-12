import { prisma } from "@/lib/prisma";
import { BusinessData, RoleAvailable, SignInData, SignUpData } from "../types/data_type";
import { Admin_Data, Event_Type, Promotion_Type } from "@prisma/client";
import { redirect } from "next/navigation";
import { Session } from "next-auth";

export async function searchEventwithTag(input: string) {
    let output;
    try {
        output = await prisma.event.findMany({
            include: {
                event_type: true,
                producer: true,
            }, where: {
                event_type: {
                    et_name: input
                }
            }, orderBy: {
                event_last_date: "asc"
            }
        })
    } catch (error) {
        console.log("searchEventwithTag Error")
        return null
    }
    return output
}

export async function searchEventwithName(input: string) {
    let output;
    try {
        output = await prisma.event.findMany({
            include: {
                event_type: true,
                producer: true,
            }, where: {
                event_name: {
                    contains: input
                }
            }, orderBy: {
                event_last_date: "asc"
            }
        })
    } catch (error) {
        console.log("searchEventwithName Error")
        return null
    }
    return output
}


export async function getBusinessData(): Promise<BusinessData | null> {
    let admin: Admin_Data | null, eventType: Event_Type[], promotionType: Promotion_Type[];
    try {
        admin = await prisma.admin_Data.findFirst({
            where: {
                ad_id: 1
            }
        })

        eventType = await prisma.event_Type.findMany({})

        promotionType = await prisma.promotion_Type.findMany({})

    } catch (error) {
        console.log("getBusinessData Error")
        return null
    }

    return {
        admin,
        eventType,
        promotionType
    };
}

export async function updateBusinessData(newImages: string[], newFee: number, newEvent: string[], newPromotion: string[]) {
    let output;
    try {
        output = await getBusinessData()

        let updateData = await prisma.admin_Data.update({
            where: {
                ad_id: output?.admin?.ad_id
            },
            data: {
                banner_images: newImages,
                fee: newFee
            }
        })

        let insertEvent = await prisma.event_Type.createMany({
            data: newEvent.map((eventINS: string) => (
                { et_name: eventINS }
            )),
        });

        let insertPromotion = await prisma.promotion_Type.createMany({
            data: newPromotion.map((promotionINS: string) => (
                { pt_name: promotionINS }
            )),
        });

        return updateData
    } catch (error) {
        console.log("updateBusinessData Error")
        return null
    }
}

export function redirectingByRole(session: Session | null) {
    if (session?.user.role == RoleAvailable.User || !session) {
        redirect("/")
    } else if (session?.user.role == RoleAvailable.Admin) {
        redirect("/admin")
    } else if (session?.user.role == RoleAvailable.Organizer) {
        redirect("/organizer")
    }
}