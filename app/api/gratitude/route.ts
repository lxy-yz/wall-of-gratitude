import { hash } from "bcrypt"
import { z } from "zod"

import { getCurrentUser } from "@/lib/auth"
import { db } from "@/lib/db"
import { getUserAvatarImage } from "@/lib/utils"
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

    const result = await db.gratitude.create({
      data: {
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
              email: to,
            },
            create: {
              email: to,
              image: getUserAvatarImage({ email: to }),
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
