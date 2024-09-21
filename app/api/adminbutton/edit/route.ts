import { NextApiRequest, NextApiResponse } from 'next';
import { editUser } from '@/app/admin/alluser/fetch';


export async function POST(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { id, outputName, outputSurName, outputEmail, outputRole } = req.body;
    if (
      typeof outputEmail === 'string' &&
      typeof outputName === 'string' &&
      typeof outputSurName === 'string' &&
      typeof outputRole === 'string' &&
      typeof id === 'number' &&
      id != 0
    ) {

    }
    const output = await editUser(id, outputEmail, outputName, outputSurName, outputRole)
    res.status(200).json({ success: true });
  } catch (error) {
    console.error('Error delete user', error);
    res.status(500).json({ success: false, error: 'Failed to delete user' });
  }
}