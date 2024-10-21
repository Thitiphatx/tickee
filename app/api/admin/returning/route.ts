import { NextRequest, NextResponse } from 'next/server';
import { setReturningStatus } from '@/app/admin/returning/fetch';
import { ReceiptStatus } from '@/types/data_type';
import { revalidatePath } from 'next/cache';

export async function POST(req: NextRequest) {
    try {
        const { status, id } = await req.json();
        if (Object.values(ReceiptStatus).includes(status) && typeof id == 'number' && id !== 0) {
            const output = await setReturningStatus(status, id)
            await revalidatePath(`/admin/returning`);
        }
        return NextResponse.json({
            message: 'Set Receipt Status successfully',
        });
    } catch (error) {
        return NextResponse.json({
            message: 'Set Receipt Status Failed',
        });
    }
}
