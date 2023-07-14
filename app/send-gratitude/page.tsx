
import { GratitudeForm } from "./gratitude-form"

export default function SendGratitudePage() {
  return (
    <section className="mx-auto max-w-screen-lg pb-8 pt-6 md:py-10">
      <h1 className="text-center text-3xl font-bold">
        Let others know your gratitude
      </h1>
      <p className="mt-4 text-center text-gray-700">A little kindness goes a long way</p>
      <div className="mt-8">
        <GratitudeForm />
      </div>
    </section>
  )
}
