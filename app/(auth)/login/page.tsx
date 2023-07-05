import Link from "next/link"

import { AuthForm } from "@/components/auth-form"

export default function LoginPage() {
  return (
    <section className="mx-auto grid max-w-md items-center gap-6 pb-8 pt-6 md:px-10 md:py-20">
      <AuthForm login />
      <p className="px-8 text-center text-sm text-muted-foreground">
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
