import { prisma } from "@/lib/prisma";
import { ReceiptStatus } from "@/types/data_type";

export async function getReturningOrder() {
    let output;
    try {
        output = await prisma.receipt.findMany({
            where:{
                rec_status:ReceiptStatus.ReturnRequest
            },
            include:{
                rec_customer:true,
                rec_seat:{
                    include:{
                        event_seat:true,
                        Seat_Dispatch:true
                    }
                }
            }
        })
        return output
    } catch (error) {
        console.log("get Returning Order Error")
        return null
    }
}

export async function setReturningStatus(newStatus:number,id:number) {
    let output;
    try {
        output = await prisma.receipt.update({
            where:{
                rec_id:id,
            },
            data:{
                rec_status:newStatus
            }
        })
        return output
    } catch (error) {
        console.log("set Returning status Error")
        return null
    }
}
