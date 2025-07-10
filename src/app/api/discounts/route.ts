import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const colors = await prisma.discount.findMany()
    return NextResponse.json(colors, { status: 200 })
  } catch (error) {
    console.error('Error fetching discounts:', error)
    return NextResponse.json({ message: 'Failed to fetch discounts' }, { status: 500 })
  }
}
