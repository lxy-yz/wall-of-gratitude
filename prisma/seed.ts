import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

async function resetAllPositions() {
  const entries = await prisma.gratitude.findMany({})

  for (const e of entries) {
    await prisma.gratitude.update({
      where: {
        id: e.id,
      },
      data: {
        fromPosition: [0, 0],
        toPosition: [0, 0],
      },
    })
  }
}

async function seedMissedUsername() {
  const users = await prisma.user.findMany({})
  for (const user of users) {
    if (!user.username) {
      const username = user.email?.split("@")[0]
      await prisma.user.update({
        where: {
          id: user.id,
        },
        data: {
          username,
        },
      })
    }
  }
}

async function main() {
  console.log(`Start seeding ...`)
  await resetAllPositions()
  console.log(`Seeding finished.`)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
