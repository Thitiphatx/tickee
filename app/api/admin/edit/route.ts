import { NextRequest, NextResponse } from 'next/server';
import { editUser } from '@/app/admin/user/fetch';


export async function POST(req: NextRequest) {
  try {
    const { id, outputName, outputEmail, outputRole } = await req.json();
    // console.log({ id, outputName, outputEmail, outputRole })
    if (
      typeof outputEmail === 'string' &&
      typeof outputName === 'string' &&
      typeof outputRole === 'string' &&
      typeof id === 'string' &&
      id != ""
    ) {
      const output = await editUser(id, outputEmail, outputName, outputRole);
    }
    return NextResponse.json({
      message: 'Delete User successfully',
  });
  } catch (error) {
    return NextResponse.json({
      message: 'Delete User Failed',
  });
  }
}