
import { deleteEvent } from '@/app/admin/allevent/fetch';
import { NextApiRequest, NextApiResponse } from 'next';

export async function POST(req: NextApiRequest,res : NextApiResponse) {
        try {
            const id = req.body;
            if (typeof id == 'number' && id !== 0) {
                const output = await deleteEvent(id)
            }
            res.status(200).json({ success: true });
        } catch (error) {
            console.error('Error delete Event', error);
            res.status(500).json({ success: false, error: 'Failed to delete Event' });
        }
}
