import { autoChangeReceiptStatus } from "@/utils/function";
import { NextResponse } from "next/server";

export async function GET() {
    try{
        await autoChangeReceiptStatus()
        return NextResponse.json({status:200});

    }
    catch(error){
        return NextResponse.json({ error: 'Failed to Change Receipt Status' }, { status: 500 });
    }
}