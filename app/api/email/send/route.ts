import { NextResponse } from "next/server"
import { render } from "@react-email/render"

import Email from "@/components/email"

const RESEND_API_KEY = process.env.RESEND_API_KEY

export async function GET() {
  try {
    const html = render(Email(), {
      pretty: true,
    })

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        //TODO: email domain
        // from: "onboarding@resend.dev",
        from: "support@liallen.me",
        to: "lxy.dev.yz@gmail.com",
        subject: "Welcome to my website!",
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
