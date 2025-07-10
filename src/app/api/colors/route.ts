import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const colors = await prisma.color.findMany()
    return NextResponse.json(colors, { status: 200 })
  } catch (error) {
    console.error('Error fetching colors:', error)
    return NextResponse.json({ message: 'Failed to fetch colors' }, { status: 500 })
  }
}
