import { NextRequest, NextResponse } from 'next/server';
import { deleteUser } from '@/app/admin/user/fetch';

export async function POST(req: NextRequest) {
    try {
        const { id } = await req.json();
        if (typeof id == 'string' && id !== "") {
            const output = await deleteUser(id)
        }
        return NextResponse.json({
            message: 'delete successfully',
        });
    } catch (error) {
        return NextResponse.json({
            message: 'Failed to delete user',
        });
    }
}
