import Link from "next/link"

import { GratitudeForm } from "./gratitude-form"

export default function NewPage() {
  return (
    <section className="mx-auto grid max-w-screen-lg items-center gap-6 pb-8 pt-6 md:py-10">
      <h1 className="text-3xl font-bold">
        Share Gratitude
      </h1>
      <div className="mt-8">
        <GratitudeForm />
      </div>
    </section>
  )
}
