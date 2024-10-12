import { NextApiRequest, NextApiResponse } from 'next';
import { setReturningStatus } from '@/app/admin/returning/fetch';
import { ReceiptStatus } from '@/types/data_type';

export async function POST(req: NextApiRequest,res : NextApiResponse) {
        try {
            const {status,id} = req.body;
            if (Object.values(ReceiptStatus).includes(status) && typeof id == 'number' && id !== 0) {
                const output = await setReturningStatus(status,id)
            }
            res.status(200).json({ success: true });
        } catch (error) {
            console.error('Error set receipt status', error);
            res.status(500).json({ success: false, error: 'Failed to set receipt status' });
        }
}
