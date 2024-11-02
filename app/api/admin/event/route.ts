
import { deleteEvent, getSelectedEvent } from '@/app/admin/event/fetch';
import { NextRequest, NextResponse } from 'next/server';

export async function DELETE(req: NextRequest) {
    try {
        const { id } = await req.json();
        if (typeof id == 'number' && id != 0) {
            const output = await deleteEvent(id)
        }
        return NextResponse.json({
            message: 'Delete Event successfully',
        });
    } catch (error) {
        return NextResponse.json({
            message: 'Failed to Delete Event',
        });
    }
}

export async function POST(req: NextRequest) {
    try {
        const { searchText } = await req.json();
        if (typeof searchText === 'string') {
            const data = await getSelectedEvent(searchText);
            if (data) {
                return NextResponse.json(data);
            } else {
                // คืนค่าผลลัพธ์ที่เหมาะสมเมื่อไม่มีข้อมูล
                return NextResponse.json({ message: 'ไม่พบข้อมูลที่ตรงกัน' }, { status: 404 });
            }
        } else {
            return NextResponse.json({ message: 'ข้อความค้นหาต้องเป็นประเภท string' }, { status: 400 });
        }
    } catch (error:any) {
        console.error('เกิดข้อผิดพลาดในการดึงข้อมูลเหตุการณ์', error);
        return NextResponse.json({
            message: 'เกิดข้อผิดพลาดในการดึงข้อมูลเหตุการณ์',
            error: error.message, // รวมข้อความข้อผิดพลาดตามความจำเป็น
        }, { status: 500 });
    }
}