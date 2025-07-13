import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const now = new Date()

    const [products, categories, colors, discounts] = await Promise.all([
      prisma.product.findMany({ where: { isArchived: false } }),
      prisma.category.findMany(),
      prisma.color.findMany(),
      prisma.discount.findMany({
        where: {
          startDate: { lte: now },
          endDate: { gte: now },
        },
      }),
    ])

    return NextResponse.json({ products, categories, colors, discounts })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'Failed to fetch data' }, { status: 500 })
  }
}
