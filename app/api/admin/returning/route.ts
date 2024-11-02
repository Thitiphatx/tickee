import { NextRequest, NextResponse } from 'next/server';
import { getReturningOrder, setReturningStatus } from '@/app/admin/returning/fetch';
import { ReceiptStatus } from '@/types/data_type';

export async function POST(req: NextRequest) {
    try {
        const { status, id } = await req.json();
        if (Object.values(ReceiptStatus).includes(status) && typeof id == 'number' && id !== 0) {
            const output = await setReturningStatus(status, id)
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

export async function GET() {
    try {
        const data = await getReturningOrder();
        if (data) {
            return NextResponse.json(data);
        } else {
            return NextResponse.json({ status: 404 , message: 'Return Data = Null' });
        }
    } catch (error) {
        return NextResponse.json({ status: 500, message: 'Internal Server Error' });
    }
}