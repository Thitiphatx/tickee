import { prisma } from "@/lib/prisma";

export async function getReceiptDate() {
    let output;
    try {
        output = await prisma.receipt.findMany({
            include:{
                rec_seat:true
            }
        })
        return output
    } catch (error) {
        console.log("getReceiptDateToPlot Error")
        return null
    }
}