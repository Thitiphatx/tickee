// app/api/receipts/route.ts
import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { prisma } from '@/prisma/seed';

export async function GET(request: Request) {
    const url = new URL(request.url);
    const customerId = url.searchParams.get("customerid") || ""; // ใช้ ID ที่กำหนด ถ้าไม่มีให้ใช้ ID นี้
    try {
        // const receipts = await prisma.receipt.findMany({
        //     where: {
        //         rec_customer_id: customerId,
        //     },

        // });

        // const seatTypes = await Promise.all(
        //     receipts.map(async (receipt) => {
        //         const seatType = await prisma.seat_Type.findFirst({
        //             where: {
        //                 Receipt: {
        //                     some: {
        //                         rec_id: receipt.rec_id,
        //                     },
        //                 },
        //             },
        //             include: {
        //                 event_seat: true, // ใส่ field ที่ต้องการดึงข้อมูลเพิ่มเติม
        //             },
        //         });

        //         const eventType = seatType ? await prisma.event_Type.findFirst({
        //             where: {
        //                 et_id: seatType.event_seat.event_type_id, // ใช้ event_type_id ที่ได้มา
        //             },
        //         }) : null;

        //         return {
        //             rec_id: receipt.rec_id,
        //             rec_date: receipt.rec_date,
        //             rec_quantity:receipt.rec_quantity,
        //             rec_type:eventType,
        //             seatType: seatType || null, // เพิ่ม seatType ที่หาได้ (หรือ null ถ้าไม่มี)
        //         };
        //     })
        // );
        const userReceipts = await prisma.receipt.findMany({
            where: { rec_customer_id: customerId },
            include: {
                rec_seat: {
                    include: {
                        event_seat: {
                            include: {
                                event_type: true, // Include event type (et_name)
                            },
                        },
                    },
                },
            },
        });



        return NextResponse.json(userReceipts, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
    }
}
