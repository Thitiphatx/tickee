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
        const data = await getBusinessData()
        if (data) {
            return NextResponse.json(data);
        }
    } catch (error) {
        console.error('Error Get Business Data', error);
        return NextResponse.json({ error: "Data not found" }, { status: 404 });
    }
}