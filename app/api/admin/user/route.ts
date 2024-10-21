import { NextRequest, NextResponse } from 'next/server';
import { deleteUser, editUser, getSelectedUser } from '@/app/admin/user/fetch';

export async function PUT(req: NextRequest) {
  try {
    const { id, outputName, outputEmail, outputRole } = await req.json();
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
      message: 'Edit User successfully',
  });
  } catch (error) {
    return NextResponse.json({
      message: 'Edit User Failed',
  });
  }
}

export async function DELETE(req: NextRequest) {
  try {
      const { id } = await req.json();
      if (typeof id == 'string' && id != "") {
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


export async function POST(req: NextRequest) {
  try {
      const { searchText } = await req.json();
      if (typeof searchText === 'string') {
          const data = await getSelectedUser(searchText);
          if (data) {
              return NextResponse.json(data);
          } else {
              return NextResponse.json({ message: 'No user found' }, { status: 404 });
          }
      } else {
          return NextResponse.json({ message: 'Invalid search text' }, { status: 400 });
      }
  } catch (error:any) {
      console.error('Error fetching user data:', error);
      return NextResponse.json({
          message: 'Error fetching user data',
          error: error.message,
      }, { status: 500 });
  }
}