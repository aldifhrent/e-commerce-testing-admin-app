import { prisma } from '@/lib/prisma'
import { Role } from '@prisma/client'
import bcrypt from 'bcrypt'

async function main() {
  // Seed admin user
  const adminPassword = await bcrypt.hash('admin', 10)
  await prisma.user.upsert({
    where: { email: 'admin@example.com' },
    update: {},
    create: {
      email: 'admin@example.com',
      name: 'Admin User',
      passwordHash: adminPassword,
      role: Role.ADMIN,
      emailVerified: new Date(),
    },
  })

  // Seed dummy user biasa
  const userPassword = await bcrypt.hash('user123', 10)
  await prisma.user.upsert({
    where: { email: 'user@example.com' },
    update: {},
    create: {
      email: 'user@example.com',
      name: 'Dummy User',
      passwordHash: userPassword,
      role: Role.USER,
      emailVerified: new Date(),
    },
  })

  // Seed kategori
  const category = await prisma.category.upsert({
    where: { name: 'Elektronik' },
    update: {},
    create: {
      name: 'Elektronik',
    },
  })

  // Seed warna
  const color = await prisma.color.upsert({
    where: { name: 'Hitam' },
    update: {},
    create: {
      name: 'Hitam',
      value: '#000000',
    },
  })

  // Seed ukuran
  const size = await prisma.size.upsert({
    where: { name: 'M' },
    update: {},
    create: {
      name: 'M',
      value: 'Medium',
    },
  })

  // Seed tag
  const tag1 = await prisma.tag.upsert({
    where: { name: 'Terlaris' },
    update: {},
    create: { name: 'Terlaris' },
  })
  const tag2 = await prisma.tag.upsert({
    where: { name: 'Baru' },
    update: {},
    create: { name: 'Baru' },
  })

  // Seed discount
  const discount = await prisma.discount.upsert({
    where: { name: 'Promo Lebaran' },
    update: {},
    create: {
      name: 'Promo Lebaran',
      description: 'Diskon 10% untuk semua produk elektronik',
      amount: 10,
      isPercent: true,
      startDate: new Date(),
      endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // +30 hari
    },
  })

  // Seed product
  await prisma.product.upsert({
    where: { name: 'Smartphone XYZ' },
    update: {
      description: 'Smartphone dengan fitur lengkap dan harga terjangkau.',
      price: 2500000,
      stock: 100,
      categoryId: category.id,
      colorId: color.id,
      sizeId: size.id,
      isArchived: false,
      isFeatured: true,
      images: {
        deleteMany: {},
        create: [
          { url: 'https://example.com/images/smartphone-xyz-front.jpg' },
          { url: 'https://example.com/images/smartphone-xyz-back.jpg' },
        ],
      },
      productTags: {
        deleteMany: {},
        create: [
          { tagId: tag1.id },
          { tagId: tag2.id },
        ],
      },
      productDiscounts: {
        deleteMany: {},
        create: [
          { discountId: discount.id },
        ],
      },
    },
    create: {
      name: 'Smartphone XYZ',
      description: 'Smartphone dengan fitur lengkap dan harga terjangkau.',
      price: 2500000,
      stock: 100,
      categoryId: category.id,
      colorId: color.id,
      sizeId: size.id,
      isArchived: false,
      isFeatured: true,
      images: {
        create: [
          { url: 'https://example.com/images/smartphone-xyz-front.jpg' },
          { url: 'https://example.com/images/smartphone-xyz-back.jpg' },
        ],
      },
      productTags: {
        create: [
          { tagId: tag1.id },
          { tagId: tag2.id },
        ],
      },
      productDiscounts: {
        create: [
          { discountId: discount.id },
        ],
      },
    },
  })

  console.log('Seeding selesai')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
