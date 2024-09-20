"use client"
import { prisma } from '@/lib/prisma'
import { useState, useEffect } from 'react'
 
export default function AddProForm() {
  const [data, setData] = useState(null)
  const [isLoading, setLoading] = useState(true)
 
  useEffect(() => {
    const fetchData = async () => {
      const data = await prisma.event.findMany();
      console.log(data)
    }
    fetchData()
  }, [])
 
  if (isLoading) return <p>Loading...</p>
  if (!data) return <p>No profile data</p>
 
  return (
    <div>
      {/* <h1>{data.name}</h1>
      <p>{data.bio}</p> */}
    </div>
  )
}