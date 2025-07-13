import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function GET() {
  try {
    const products = await prisma.product.findMany({
      where: { isArchived: false },
      include: {
        category: true,
        color: true,
        size: true,
        images: true,
        productTags: { include: { tag: true } },
        productDiscounts: { include: { discount: true } },
      },
    })

    const mapped = products.map(({ productTags, productDiscounts, ...rest }) => ({
      ...rest,
      tags: productTags.map(pt => pt.tag),
      discounts: productDiscounts.map(pd => pd.discount),
    }))

    return NextResponse.json(mapped, { status: 200 })
  } catch (error) {
    console.error("Failed to fetch products", error)
    return NextResponse.json({ error: "Failed to fetch products" }, { status: 500 })
  }
}
