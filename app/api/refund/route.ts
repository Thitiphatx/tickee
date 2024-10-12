import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const receiptData = await req.json();
    console.log('Incoming Receipt Data for Refund:', receiptData);

    // Update the receipt status to 3 (as refunded or canceled)
    const updatedReceipt = await prisma.receipt.update({
      where: {
        rec_id: parseInt(receiptData.rec_id), // Assuming rec_id is passed in the body
      },
      data: {
        rec_status: 3, // Change status to 3 to indicate refund/cancellation
      },
    });

    return NextResponse.json({
      message: 'Refund processed successfully',
      receipt: updatedReceipt,
    });
  } catch (error) {
    console.error('Error processing refund:', error);
    return NextResponse.json({ message: 'Failed to process refund' }, { status: 500 });
  }
}
export async function GET(req: Request){
    
}
