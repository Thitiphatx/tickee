
import { PrismaClient } from '@prisma/client';
import { useState, useEffect } from 'react'

interface Event {
  event_id: number;
  event_name: string;
  event_intro: string;
}

export default async function AddProForm() {
  const prisma = new PrismaClient();
  const detai = await prisma.event.findFirst();
  console.log(detai)


  return (
    <div>
      dawd
    </div>
  )
}
