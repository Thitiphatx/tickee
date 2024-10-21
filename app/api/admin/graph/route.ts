import { getReceiptDate } from '@/app/admin/fetch';
import { NextResponse } from 'next/server';

export async function GET() {
    try {
        const data = await getReceiptDate()
        return NextResponse.json(data);
    } catch (error) {
        console.error('Error Get Receipt Data', error);
        return NextResponse.json({ error: "Data not found" }, { status: 404 });
    }
}