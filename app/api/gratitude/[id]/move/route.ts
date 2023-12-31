import { z } from "zod"

import { getCurrentUser } from "@/lib/auth"
import { db } from "@/lib/db"
import { gratitudeSchema } from "@/lib/validations"

const routeContextSchema = z.object({
  params: z.object({
    id: z.string(),
  }),
})

export async function PATCH(
  req: Request,
  context: z.infer<typeof routeContextSchema>
) {
  try {
    const user = await getCurrentUser()
    if (!user) {
      return new Response("Unauthorized", { status: 403 })
    }

    const { id } = context.params
    const found = await db.gratitude.findUnique({
      where: { id },
      select: {
        fromUserId: true,
        toUserId: true,
      },
    })
    if (!found) {
      return new Response(null, { status: 404 })
    }

    const moveBySender = found.fromUserId === user.id
    const moveByReceiver = found.toUserId === user.id
    if (!moveBySender && !moveByReceiver) {
      return new Response("Unauthorized", { status: 403 })
    }

    const body = await req.json()
    const { top, left } = gratitudeSchema
      .pick({
        left: true,
        top: true,
      })
      .parse(body)
    await db.gratitude.update({
      where: { id },
      data: {
        ...(moveBySender && {
          fromPosition: [left, top],
        }),
        ...(moveByReceiver && {
          toPosition: [left, top],
        }),
      },
    })

    return new Response(null, { status: 204 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(JSON.stringify(error.issues), { status: 422 })
    }
    console.error(error)
    return new Response(null, { status: 500 })
  }
}
