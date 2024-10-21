import { getReceiptDate } from '@/app/admin/fetch';
import { NextResponse } from 'next/server';

export async function GET() {
    try {
        const data = await getReceiptDate();
        
        // ตรวจสอบว่ามีข้อมูลหรือไม่
        if (data) {
            return NextResponse.json(data);
        } else {
            return NextResponse.json({ message: 'ไม่พบข้อมูลใบเสร็จ' }, { status: 404 });
        }
    } catch (error:any) {
        console.error('เกิดข้อผิดพลาดในการดึงข้อมูลใบเสร็จ', error);
        return NextResponse.json({
            message: 'เกิดข้อผิดพลาดในการดึงข้อมูลใบเสร็จ',
            error: error.message, // ส่งข้อความข้อผิดพลาด
        }, { status: 500 });
    }
}