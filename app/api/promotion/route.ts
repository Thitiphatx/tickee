import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(req: Request) {
  const promotionData = await req.json();
  
  

  // Extract year, month, and day from the date objects
  const startDate = new Date(
    promotionData.pro_start_date.year,
    promotionData.pro_start_date.month - 1, // month is 0-indexed
    promotionData.pro_start_date.day
  );
  const lastDate = new Date(
    promotionData.pro_last_date.year,
    promotionData.pro_last_date.month - 1, // month is 0-indexed
    promotionData.pro_last_date.day
  );

  // Validate the dates
  if (isNaN(startDate.getTime()) || isNaN(lastDate.getTime())) {
    return NextResponse.json({ message: 'Invalid date format' }, { status: 400 });
  }

  try {
    const newPromotion = await prisma.promotion.create({
      data: {
        seat_type_id: promotionData.seat_type_id,
        pro_description: promotionData.pro_description,
        pro_discount: promotionData.pro_discount,
        pro_start_date: startDate,
        pro_last_date: lastDate,
        pro_type_id: promotionData.pro_type, // Adjust if necessary
      },
    });

    return NextResponse.json({
      message: 'Promotion created successfully',
      promotion: newPromotion,
    });
  } catch (error) {
    console.error('Error creating promotion:', error);
    return NextResponse.json({ message: 'Failed to create promotion' }, { status: 500 });
  }
}
export async function PUT(req: Request) {
  const promotionData = await req.json();

  

  // Extract year, month, and day from the date objects
  const startDate = new Date(
    promotionData.pro_start_date.year,
    promotionData.pro_start_date.month - 1, // month is 0-indexed
    promotionData.pro_start_date.day
  );
  const lastDate = new Date(
    promotionData.pro_last_date.year,
    promotionData.pro_last_date.month - 1, // month is 0-indexed
    promotionData.pro_last_date.day
  );

  // Validate the dates
  if (isNaN(startDate.getTime()) || isNaN(lastDate.getTime())) {
    return NextResponse.json({ message: 'Invalid date format' }, { status: 400 });
  }

  try {
    // Assuming the promotion ID is included in the request body
    const updatedPromotion = await prisma.promotion.update({
      where: {
        pro_id: parseInt(promotionData.promotionId), // Get the promotion ID from the body
      },
      data: {
        pro_description: promotionData.pro_description,
        pro_discount: promotionData.pro_discount,
        pro_start_date: startDate,
        pro_last_date: lastDate,
        pro_type_id: promotionData.pro_type,
      },
    });

    return NextResponse.json({
      message: 'Promotion updated successfully',
      promotion: updatedPromotion,
    });
  } catch (error) {
    console.error('Error updating promotion:', error);
    return NextResponse.json({ message: 'Failed to update promotion' }, { status: 500 });
  }
}
