import { prisma } from "@/prisma/seed";
import { compare, hashSync } from "bcrypt";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const body = await req.json();

    if (body.password.new1 != body.password.new2) {
        return NextResponse.json({ error: 'รหัสผ่านไม่ตรงกัน' });
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
        return NextResponse.json({ error: 'เกิดข้อผิดพลาด ไม่พบผู้ใช้' });
    }

    const matched = await compare(body.password.current, userData.password);
    if (!matched) {
        return NextResponse.json({ error: 'รหัสผ่านปัจจุบันไม่ถูกต้อง' });
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
        return NextResponse.json({ error: 'เกิดข้อผิดพลาด' });
    }
}
