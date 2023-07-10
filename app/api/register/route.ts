import { hash } from "bcrypt"
import { z } from "zod"

import { db } from "@/lib/db"
import { authSchema } from "@/lib/validations"

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
    const body = await req.json()
    const { username, email, password } = authSchema.parse(body)

    if (!email || !password) {
      return new Response(
        JSON.stringify({ error: "Email and password are required" }),
        { status: 400 }
      )
    }

    const foundUser = await db.user.findUnique({ where: { email } })
    if (foundUser?.password) {
      return new Response(JSON.stringify({ error: "Account already exists" }), {
        status: 400,
      })
    }

    const hashedPassword = await hash(password, 10)
    const user = await db.user.upsert({
      where: { email },
      update: { username, password: hashedPassword },
      create: {
        email,
        username,
        password: hashedPassword,
      },
    })
    return new Response(JSON.stringify({ data: user }), { status: 200 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(JSON.stringify(error.issues), { status: 422 })
    }

    console.error(error)
    return new Response(null, { status: 500 })
  }
}
