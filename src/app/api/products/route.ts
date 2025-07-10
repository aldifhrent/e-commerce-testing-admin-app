import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const products = await prisma.product.findMany({
      where: { isArchived: false },
      include: {
        category: true,
        color: true,
        size: true,
        images: true,
        productTags: {
          include: {
            tag: true,
          },
        },
        productDiscounts: {
          include: {
            discount: true,
          },
        },
      },
    });

    // Supaya tags dan discounts bisa langsung diakses dari root produk
    const mapped = products.map((product) => ({
      ...product,
      tags: product.productTags.map((pt) => pt.tag),
      discounts: product.productDiscounts.map((pd) => pd.discount),
      productTags: undefined,
      productDiscounts: undefined,
    }));

    return NextResponse.json(mapped, { status: 200 });
  } catch (error) {
    console.error("Failed to fetch products", error);
    return NextResponse.json({ error: "Failed to fetch products" }, { status: 500 });
  }
}
