import { prisma } from "@/prisma/seed";
import { compare, hashSync } from "bcrypt";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const body = await req.json();

    if (body.password.new1 != body.password.new2) {
        return NextResponse.json({ error: 'New password not match' });
    }
    const userData = await prisma.user.findFirst({
        where: {
            id: body.id
        },
        select: {
            password: true,
        }
    });
    if (!userData || !userData.password) {
        return NextResponse.json({ error: 'User not found or no password set' });
    }

    const matched = await compare(body.password.current, userData.password);
    if (!matched) {
        return NextResponse.json({ error: 'Incorrect password' });
    }
    const hashedPassword = await hashSync(body.password.new1, 10);
    
    try {
        await prisma.user.update({
            where: {
                id: body.id
            },
            data: {
                password: hashedPassword
            }
        });

        return NextResponse.json({ status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Failed to edit' });
    }
}
