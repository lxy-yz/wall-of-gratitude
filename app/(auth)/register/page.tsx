import Link from "next/link"

import { AuthForm } from "@/components/auth-form"

export default function RegisterPage() {
  return (
    <section className="mx-auto grid max-w-md items-center gap-6 pb-8 pt-6 md:px-10 md:py-20">
      <AuthForm />
      <p className="px-8 text-center text-sm text-muted-foreground">
        <Link
          href="/login"
          className="hover:text-brand underline underline-offset-4"
        >
          Already have an account? Sign in.
        </Link>
      </p>
    </section>
  )
}
