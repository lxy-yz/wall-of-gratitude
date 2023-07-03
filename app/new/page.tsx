import Link from "next/link"

import { siteConfig } from "@/config/site"
import { buttonVariants } from "@/components/ui/button"
import { StickyNote } from "./sticky-note"
// import { StickyNote } from "lucide-react"

export default function IndexPage() {
  return (
    <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
      <div className="pt-[96px] mx-auto max-w-screen-sm">
        <StickyNote />
      </div>
    </section>
  )
}
