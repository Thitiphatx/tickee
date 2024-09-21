import { prisma } from "@/prisma/seed";
import { hashSync } from "bcrypt";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    const body = await request.json();
    const { email, password, repass, name } = body.data;
    if (!email || !password || !repass || !name) {
        return NextResponse.json({error: 'Please provide all'})
    }

    const exist = await prisma.user.findUnique({
        where: {
            email: email
        }
    });
    if (exist) {
        return NextResponse.json({error: 'User already existed'})
    }

    const hashedPassword = await hashSync(password, 10);
    const user = await prisma.user.create({
        data: {
            name,
            email,
            password: hashedPassword
        }
    })
    return NextResponse.json({status: 200});
}