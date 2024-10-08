import { prisma } from "@/lib/prisma";
import { BusinessData, SignInData, SignUpData } from "../types/data_type";
import { Admin_Data, Event_Type, Promotion_Type } from "@prisma/client";

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
    let admin:Admin_Data|null,eventType:Event_Type[],promotionType:Promotion_Type[];
    try {
        admin = await prisma.admin_Data.findFirst({
            where : {
                ad_id:1
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

export async function updateBusinessData(newImages: string[], newFee: number) {
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
        return updateData
    } catch (error) {
        console.log("updateBusinessData Error")
        return null
    }
}

// old signup and signin manually

// export async function userSignIn(input:SignInData) {
//     let output;
//     try {
//         output = await prisma.user.findFirst({
//             where:{
//                 AND: [
//                     {
//                         user_email:input.email
//                     },
//                     {
//                         user_password:input.password
//                     },
//                 ],
//             }
//         })
//     } catch (error) {
//         console.log("userSignIn Error")
//         return null
//     }
//     return output
// }

// export async function userSignUp(input:SignUpData) {
//     let role;
//     try {
//         role = await prisma.role.findFirst({
//             where:{
//                 role_name:"User"
//             }
//         })
//     } catch (error) {
//         console.log("findRole Error")
//         return null
//     }

//     try {
//         let output = await prisma.user.create({
//             data: {
//                 user_email:input.email,
//                 user_name:input.name,
//                 user_surname:input.surname,
//                 user_password: input.password,
//                 user_IDcard: input.idcard,
//                 user_birthdate:input.birthdate,
//                 user_phone:input.phone,
//                 user_role_id:role?.role_id || 0,
//             }
//         })
//     } catch (error) {
//         console.log("userSignIn Error")
//         return null
//     }
// }