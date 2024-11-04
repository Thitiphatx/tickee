import { getReceiptDate } from '@/utils/function';
import { NextResponse } from 'next/server';

export async function GET() {
    try {
        const data = await getReceiptDate();
        if (data) {
            return NextResponse.json(data);
        } else {
            return NextResponse.json({ status: 404 , message: 'Return Data = Null' });
        }
    } catch (error) {
        return NextResponse.json({ status: 500, message: 'Internal Server Error' });
    }
}