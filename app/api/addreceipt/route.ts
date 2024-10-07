import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(req: Request) {
    const { rec_date, rec_quantity, rec_customer_id, rec_seat_id } = await req.json();
    try {
        const receipt = await prisma.receipt.create({
            data: {
                rec_date: rec_date,
                rec_quantity: rec_quantity,
                rec_customer: {
                    connect: { id: rec_customer_id }, // เชื่อมโยงกับ User
                },
                rec_seat: {
                    connect: { seat_id: rec_seat_id }, // เชื่อมโยงกับ Seat_Type
                },
            },
        });
        return NextResponse.json(receipt, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
    }
}

export async function GET() {
    return NextResponse.json({ message: "GET method not allowed" }, { status: 405 });
}
