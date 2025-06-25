import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('Start seeding...')
  const adminUser = await prisma.user.findUnique({
    where: { username: 'admin' },
  })

  if (!adminUser) {
    console.log('Admin user not found, creating one...')
    const hashedPassword = await bcrypt.hash('password', 10)
    await prisma.user.create({
      data: {
        username: 'admin',
        password: hashedPassword,
      },
    })
    console.log('Admin user created with username: admin and password: password')
  } else {
    console.log('Admin user already exists.')
  }
  console.log('Seeding finished.')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
