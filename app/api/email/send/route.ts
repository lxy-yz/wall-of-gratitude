import { NextResponse } from "next/server"
import Email from "@/emails/thank-you"
import { render } from "@react-email/render"
import { z } from "zod"

import { getCurrentUser } from "@/lib/auth"
import { today } from "@/lib/utils"
import { gratitudeSchema } from "@/lib/validations"

const RESEND_API_KEY = process.env.RESEND_API_KEY

const bodySchema = gratitudeSchema
  .pick({
    to: true,
    content: true,
    fontSize: true,
    typeface: true,
    bg: true,
  })
  .extend({
    tags: z.array(z.string()),
  })

export async function POST(req: Request) {
  try {
    const user = await getCurrentUser()
    if (!user) {
      return new Response("Unauthorized", { status: 403 })
    }

    const body = await req.json()
    const { to, content, fontSize, typeface, bg, tags } = bodySchema.parse(body)

    const html = render(
      Email({
        from: user.name ?? "Anonymous",
        fromEmail: user.email,
        to,
        logoLink: "https://wallofgratitute.site",
        data: {
          content,
          fontSize,
          typeface,
          bg,
          tags,
          date: today,
        },
      }),
      {
        pretty: true,
      }
    )

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "WallOfGratitute <noreply@wallofgratitute.site>",
        to: "hi@liallen.me", //TODO: change to user.email
        subject: `💌 Thank you from ${user.name || user.email}!`,
        html,
      }),
    })

    if (res.ok) {
      const data = await res.json()
      return NextResponse.json(data)
    }
    return NextResponse.json(
      {
        error: res.statusText,
        data: await res.json(),
      },
      { status: 400 }
    )
  } catch (error) {
    console.error(error)
    return NextResponse.json(null, { status: 500 })
  }
}
