import Link from "next/link"

import { AuthForm } from "@/components/auth-form"

export default function RegisterPage() {
  return (
    <section className="mx-auto flex h-screen max-w-sm flex-col justify-center">
      <AuthForm />
      <p className="mt-6 px-8 text-center text-sm text-muted-foreground">
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
