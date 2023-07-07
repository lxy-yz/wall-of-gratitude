import { NextResponse } from "next/server"
import Email from "@/emails/welcome"
import { render } from "@react-email/render"
import { z } from "zod"

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
    const body = await req.json()
    const { to, content, fontSize, typeface, bg, tags } = bodySchema.parse(body)

    const html = render(
      Email({
        to,
        data: {
          content,
          fontSize,
          typeface,
          bg,
          tags,
          date: new Date().toLocaleDateString("en-US", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
          }),
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
        //TODO: email domain
        // from: "onboarding@resend.dev",
        from: "noreply@wallofgratitute.site",
        to: "lxy.dev.yz@gmail.com",
        subject: "Hello from WallOfGratitude!",
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
