import { NextApiRequest, NextApiResponse } from 'next';
import { deleteUser } from '@/app/admin/alluser/fetch';


export async function POST(req: NextApiRequest,res : NextApiResponse) {
        try {
            const id = req.body;
            if (typeof id == 'number' && id !== 0) {
                const output = await deleteUser(id)
            }
            res.status(200).json({ success: true });
        } catch (error) {
            console.error('Error delete user', error);
            res.status(500).json({ success: false, error: 'Failed to delete user' });
        }
}
