import { NextRequest, NextResponse } from 'next/server';
import { editUser, getSelectedUser } from '@/app/admin/user/fetch';
import { revalidatePath } from 'next/cache';


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
      await revalidatePath(`/admin/user`);
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

export async function GET(req: NextRequest) {
  try {
    const { searchText } = await req.json();
    if (typeof searchText === 'string') {
      const data = await getSelectedUser(searchText)
      if (data) {
          return NextResponse.json(data);
      } else {
        throw Error
      }
    }
  } catch (error) {
      console.error('Error Get User Data', error);
      return null
  }
}