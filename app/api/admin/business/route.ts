import { getBusinessData, updateBusinessData } from '@/utils/function';
import { NextApiRequest, NextApiResponse } from 'next';
import { NextResponse } from 'next/server';

export async function POST(req: NextApiRequest, res: NextApiResponse) {
    try {
        const { banner, fee } = req.body;
        if (typeof fee == 'number') {
            const output = await updateBusinessData(banner, fee)
        }
        res.status(200).json({ success: true });
    } catch (error) {
        console.error('Error update Business', error);
        res.status(500).json({ success: false, error: 'Failed to update Business' });
    }
}

export async function GET() {
    try {
        const data = await getBusinessData()
        return NextResponse.json(data);
    } catch (error) {
        console.error('Error Get Business Data', error);
        return null
    }
}