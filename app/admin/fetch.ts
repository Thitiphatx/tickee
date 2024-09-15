import { prisma } from "@/lib/prisma";

export async function getReceiptDate() {
    let output;
    try {
        output = await prisma.receipt.findMany({
            include:{
                rec_seat:true
            }
        })
    } catch (error) {
        console.log("getReceiptDateToPlot Error")
        return null
    }
    return output
}