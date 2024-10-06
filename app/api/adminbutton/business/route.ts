import { updateBusinessData } from '@/utils/function';
import { NextApiRequest, NextApiResponse } from 'next';

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
