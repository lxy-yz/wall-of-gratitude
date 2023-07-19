import { z } from "zod"

import { getCurrentUser } from "@/lib/auth"
import { db } from "@/lib/db"
import {
  getDefaultUsername,
  getInitialPositionForCard,
  getUserAvatarImage,
} from "@/lib/utils"
import { gratitudeSchema } from "@/lib/validations"

const routeContextSchema = z.object({
  params: z.object({
    userId: z.string(),
  }),
})

export async function POST(
  req: Request,
  context: z.infer<typeof routeContextSchema>
) {
  try {
    const user = await getCurrentUser()
    if (!user) {
      return new Response("Unauthorized", { status: 403 })
    }

    const body = await req.json()
    const { to, content, notify, fontSize, typeface, bg, tags } =
      gratitudeSchema.parse(body)

    const fromCnt = await db.gratitude.count({
      where: {
        from: {
          id: user.id,
        },
      },
    })
    const toCnt = await db.gratitude.count({
      where: {
        to: {
          email: to.email,
        },
      },
    })
    const fromPosition = getInitialPositionForCard(fromCnt)
    const toPosition = getInitialPositionForCard(toCnt)

    let username = getDefaultUsername(to.email)
    while (await db.user.findFirst({ where: { username } })) {
      username = `${username}${Math.floor(Math.random() * 1000)}`
    }

    const result = await db.gratitude.create({
      data: {
        fromPosition: [fromPosition.left, fromPosition.top],
        toPosition: [toPosition.left, toPosition.top],
        content,
        notify,
        fontSize,
        typeface,
        bg,
        from: {
          connect: {
            email: user.email as string,
          },
        },
        to: {
          connectOrCreate: {
            where: {
              email: to.email,
            },
            create: {
              email: to.email,
              name: to.name,
              username,
              image: getUserAvatarImage({ email: to.email }),
            },
          },
        },
        tags: {
          connectOrCreate: tags?.map((tag) => ({
            where: { name: tag.value },
            create: { name: tag.value },
          })),
        },
      },
    })

    return new Response(JSON.stringify({ data: result }), { status: 200 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(JSON.stringify(error.issues), { status: 422 })
    }
    console.error(error)
    return new Response(null, { status: 500 })
  }
}
