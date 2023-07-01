import Link from "next/link"

import { AuthForm } from "@/components/auth-form"

export default function RegisterPage() {
  return (
    <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
      <AuthForm />
      <p className="px-8 text-center text-sm text-muted-foreground">
        <Link
          href="/login"
          className="hover:text-brand underline underline-offset-4"
        >
          Already have an account? Sign In
        </Link>
      </p>
    </section>
  )
}
