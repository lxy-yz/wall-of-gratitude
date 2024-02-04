import { NextResponse } from "next/server"
import Email from "@/emails/thank-you"
import { render } from "@react-email/render"

import { getCurrentUser } from "@/lib/auth"
import { db } from "@/lib/db"
import { formatDate } from "@/lib/utils"

const RESEND_API_KEY = process.env.RESEND_API_KEY

export async function POST(req: Request) {
  try {
    const user = await getCurrentUser()
    if (!user) {
      return new Response("Unauthorized", { status: 403 })
    }

    const body = await req.json()
    const { gratitudeId: id } = body
    const data = await db.gratitude.findUnique({
      where: { id },
      include: { tags: true, from: true, to: true },
    })
    if (!data) {
      return new Response(null, { status: 404 })
    }
    if (data.fromUserId !== user.id) {
      return new Response("Unauthorized", { status: 403 })
    }

    const html = render(
      Email({
        from: {
          name: user.name ?? "Someone",
          username: user.username,
          email: user.email,
        },
        to: {
          email: data.to.email as string,
          name: data.to.name ?? "",
          image: data.to.image as string,
        },
        detailsLink: `https://wallofgratitude.vercel.app/gratitudes/${id}`,
        data: {
          content: data.content,
          fontSize: data.fontSize,
          typeface: data.typeface,
          bg: data.bg,
          tags: data.tags.map((tag) => tag.name),
          date: formatDate(data.createdAt),
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
        from: "Wall of Gratitude <noreply@wallofgratitude.site>",
        to: data.to.email,
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
