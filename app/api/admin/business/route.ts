import { getBusinessData, updateBusinessData } from '@/utils/function';
import { revalidatePath } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
    try {
        const { bannerFiltered, fee, insertEventType, insertPromotionType } = await req.json();
        if (typeof fee == 'number') {
            const output = await updateBusinessData(bannerFiltered, fee, insertEventType, insertPromotionType)
            await revalidatePath(`/admin`);
        }
        return NextResponse.json({
            message: 'Promotion created successfully',
        });
    } catch (error) {
        return NextResponse.json({
            message: 'Promotion created fail',
        });
    }
}

export async function GET() {
    try {
        const data = await getBusinessData();
        if (data) {
            return NextResponse.json(data);
        }
        // หากไม่พบข้อมูล ให้คืนค่าเป็น response ที่ว่างหรือสถานะ 404
        return NextResponse.json({ message: 'ไม่พบข้อมูล' }, { status: 404 });
    } catch (error:any) {
        console.error('เกิดข้อผิดพลาดในการดึงข้อมูลธุรกิจ', error);
        // คืนค่าเป็น response แทนที่จะเป็น null
        return NextResponse.json({
            message: 'เกิดข้อผิดพลาดในการดึงข้อมูลธุรกิจ',
            error: error.message, // รวมข้อความข้อผิดพลาดตามความจำเป็น
        }, { status: 500 });
    }
}