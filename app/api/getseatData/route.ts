import { NextResponse } from 'next/server'; // Use NextResponse from next/server
import { prisma } from '@/lib/prisma';

// Example function to fetch data from your database
async function getSeatData(seatId: number) {
  const seatData = await prisma.seat_Type.findFirst({
    where: {
      seat_id: seatId, // Filter by the seat_id
    },
    include: {
        Seat_Dispatch: true
    }
  });
  return seatData;
}

// Named export for the GET request
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const seatId = searchParams.get('seatId');

  try {
    const data = await getSeatData(Number(seatId));
    
    if (!data) {
      return NextResponse.json({ success: false, message: 'Seat not found' }, { status: 404 });
    }
    
    return NextResponse.json({ success: true, data }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Unable to fetch seat data' }, { status: 500 });
  }
}
