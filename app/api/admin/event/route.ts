
import { deleteEvent, getSelectedEvent } from '@/app/admin/event/fetch';
import { revalidatePath } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';

export async function DELETE(req: NextRequest) {
    try {
        const { id } = await req.json();
        if (typeof id == 'number' && id != 0) {
            const output = await deleteEvent(id)
            await revalidatePath(`/admin/event`);
        }
        return NextResponse.json({
            message: 'Delete Event successfully',
        });
    } catch (error) {
        return NextResponse.json({
            message: 'Failed to Delete Event',
        });
    }
}

export async function POST(req: NextRequest) {
    try {
      const { searchText } = await req.json();
      if (typeof searchText === 'string') {
        const data = await getSelectedEvent(searchText)
        if (data) {
            return NextResponse.json(data);
        } else {
          throw Error
        }
      }
    } catch (error) {
        console.error('Error Get User Data', error);
        return NextResponse.json({ error: "Data not found" }, { status: 404 });
    }
  }