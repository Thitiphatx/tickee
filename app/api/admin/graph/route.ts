import { getLastCalculationResult } from '@/utils/server';
import { NextResponse } from 'next/server';

export async function GET() {
    try {
        const data = await getLastCalculationResult();
        if (data) {
            return NextResponse.json(data);
        } else {
            return NextResponse.json({ status: 404 , message: 'Return Data = Null' });
        }
    } catch (error) {
        return NextResponse.json({ status: 500, message: 'Internal Server Error' });
    }
}