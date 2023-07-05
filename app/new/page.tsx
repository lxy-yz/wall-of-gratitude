import Link from "next/link"

import { Panel } from "./panel"

export default function NewPage() {
  return (
    <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
      <div className="pt-[96px]">
        <Panel />
      </div>
    </section>
  )
}
