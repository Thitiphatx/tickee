import { Prisma, PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(request:Request) {
    try{
        const admindata = await prisma.admin_Data.findFirst();
        return NextResponse.json(admindata);

    }
    catch(error){
        return NextResponse.json({ error: 'Failed to fetch banner images' }, { status: 500 });
    }

    
}