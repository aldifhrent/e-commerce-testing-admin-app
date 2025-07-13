// pages/api/products.ts (atau /api/products/stock.ts)

import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const products = await prisma.tag.findMany({
     
    });

    return NextResponse.json(products)
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json(error.message, { status: 500})
    }
  }
}
