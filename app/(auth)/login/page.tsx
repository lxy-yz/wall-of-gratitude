import Link from "next/link"

import { AuthForm } from "@/components/auth-form"

export default function LoginPage() {
  return (
    <section className="mx-auto flex h-screen max-w-sm flex-col justify-center">
      <AuthForm login />
      <p className="mt-6 px-8 text-center text-sm text-muted-foreground">
        <Link
          href="/register"
          className="hover:text-brand underline underline-offset-4"
        >
          Don&apos;t have an account? Sign up.
        </Link>
      </p>
    </section>
  )
}
