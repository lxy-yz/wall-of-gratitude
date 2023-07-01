import Link from "next/link"

import { AuthForm } from "@/components/auth-form"

export default function LoginPage() {
  return (
    <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
      <AuthForm login />
      <p className="px-8 text-center text-sm text-muted-foreground">
        <Link
          href="/register"
          className="hover:text-brand underline underline-offset-4"
        >
          Don&apos;t have an account? Sign Up
        </Link>
      </p>
    </section>
  )
}
