import { prisma } from "@/prisma/seed";
import { NextResponse } from "next/server";

export async function POST(req: Request) { 
    const body = await req.json();
    const {
        id,
        email,
        name,
        role,
        idCard,
        mobile,
        birthDate
    } = body;
    try {
        await prisma.user.update({
            where: {
                id: id
            },
            data: {
                email,
                name,
                role,
                idCard,
                mobile,
                birthDate
            }
        })
        return NextResponse.json({ status: 200 });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to edit' }, { status: 500 });
    }
}