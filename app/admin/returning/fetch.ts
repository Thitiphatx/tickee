import { prisma } from "@/lib/prisma";
import { ReceiptStatus } from "@/types/data_type";

export async function getReturningOrder() {
    let output;
    try {
        output = await prisma.receipt.findMany({
            where: {
                rec_status: ReceiptStatus.ReturnRequest
            },
            include: {
                rec_customer: true,
                rec_seat: {
                    include: {
                        event_seat: true,
                        Seat_Dispatch: true
                    }
                }
            }
        })
        return output
    } catch (error) {
        
        return null
    }
}

export async function setReturningStatus(newStatus: number, id: number) {
    let output;
    try {
        if (newStatus == ReceiptStatus.ReturnSuccess) {

            const rec = await prisma.receipt.findUnique({
                where: {
                    rec_id: id,
                },
                include: {
                    rec_seat: true,
                },
            });

            if (!rec) {
                
                return;
            }

            const seat = rec.rec_seat;

            if (seat) {
                const recUpdate = await prisma.receipt.update({
                    where: {
                        rec_id: id,
                    },
                    data: {
                        rec_status: newStatus,
                    },
                });

                const dispatch = await prisma.seat_Dispatch.findFirst({
                    where: {
                        seat_type_id: seat.seat_id,
                    },
                });

                if (!dispatch) {
                    
                    return
                }

                const output = await prisma.seat_Dispatch.update({
                    where: {
                        seat_type_id: seat.seat_id,
                    },
                    data: {
                        sd_current: dispatch?.sd_current - rec.rec_quantity,
                    },
                });
                return output
            }
        } else if (newStatus == ReceiptStatus.UnableToReturn){
            output = await prisma.receipt.update({
                where: {
                    rec_id: id,
                },
                data: {
                    rec_status: newStatus
                }
            })
            return output
        }

    } catch (error) {
        
        return null
    }
}
