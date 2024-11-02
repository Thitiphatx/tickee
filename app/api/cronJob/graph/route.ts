import { getReceiptDate } from "@/utils/function";
import { NextResponse } from "next/server";

var lastCalculation:any = null;

export async function GET() {
    try{
        let temp = await getReceiptDate();
        if (temp) {
            lastCalculation = temp
            console.log("graphTask")
        }
        return NextResponse.json(lastCalculation);
    }
    catch(error){
        return NextResponse.json({ error: 'Failed to fetch Graph' }, { status: 500 });
    }
}
