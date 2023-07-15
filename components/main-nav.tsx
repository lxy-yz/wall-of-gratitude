import Link from "next/link"

import { NavItem } from "@/types/nav"
import Image from "next/image"

interface MainNavProps {
  items?: NavItem[]
}

export function MainNav({ items }: MainNavProps) {
  return (
    <div className="mx-auto -translate-x-8">
      <Link href="/" className="flex items-center space-x-2">
        <Image
          height={48}
          width={48}
          src="/icons/logo.png"
          alt="Logo"
        />
        {/* <span className="inline-block font-bold">{siteConfig.name}</span> */}
      </Link>
      {/* {items?.length ? (
        <nav className="hidden gap-6 md:flex">
          {items?.map(
            (item, index) =>
              item.href && (
                <Link
                  key={index}
                  href={item.href}
                  className={cn(
                    "flex items-center text-sm font-medium text-muted-foreground",
                    item.disabled && "cursor-not-allowed opacity-80"
                  )}
                >
                  {item.title}
                </Link>
              )
          )}
        </nav>
      ) : null} */}
    </div>
  )
}
