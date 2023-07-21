'use client'
import Link from "next/link"

import { buttonVariants } from "@/components/ui/button"
import { useSticky } from "@/lib/hooks"
import { cn } from "@/lib/utils"
import { Icon } from "@iconify/react"
import { X } from "lucide-react"
import { signOut, useSession } from "next-auth/react"
import Image from 'next/image'
import { usePathname, useSearchParams } from "next/navigation"
import { useCallback, useEffect, useState } from "react"
import { ThemeToggle } from "./theme-toggle"
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet"

// https://nextjs.org/docs/app/api-reference/functions/use-router#router-events
function useRouterChange(cb: () => void) {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  useEffect(() => {
    cb()
  }, [pathname, searchParams, cb])
}

export function SiteHeader() {
  const { data: sess } = useSession()

  const [open, setOpen] = useState(false)
  useRouterChange(
    useCallback(() => setOpen(false), [])
  )

  const [stickyRef, sticky] = useSticky()
  const pathname = usePathname()
  // TODO: use mutltiple root layouts instead
  // https://nextjs.org/docs/app/building-your-application/routing/route-groups#opting-specific-segments-into-a-layout
  // https://github.com/shadcn-ui/taxonomy/blob/main/app/layout.tsx
  if (pathname === '/') return null
  const isUserPage = pathname.startsWith('/u/')

  return (
    <header
      ref={stickyRef}
      className={cn("top-0 z-40 w-full",
        isUserPage ? "fixed bg-transparent" : "sticky bg-white dark:bg-black",
      )}>
      <div className="flex">
        <div className="">
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <div onClick={() => setOpen(true)}>
                <div className="p-4">
                  <Icon className={`${isUserPage ? '' : ''} h-8 w-8 cursor-pointer font-bold`} icon="fluent:panel-left-text-20-regular" />
                </div>
              </div>
            </SheetTrigger>
            <SheetContent side={'left'} className='NavDialog h-full w-full'>
              <div className="relative flex justify-center">
                <div className="absolute">
                  <Image
                    className=""
                    src='/icons/logo.png'
                    alt='logo'
                    width={120}
                    height={120}
                  />
                  {/* <span className="relative -top-6 text-sm font-extrabold uppercase">
                    Wall of Gratitude
                  </span> */}
                </div>
              </div>
              <nav className="flex h-full flex-col items-center justify-center gap-4 font-extrabold text-slate-600">
                {!sess ? (
                  <>
                    <Link
                      href="/send-gratitude"
                      className={cn(buttonVariants({ variant: 'ghost' }), 'text-3xl')}
                    >
                      Send
                    </Link>
                    <Link
                      href="/discover"
                      className={cn(buttonVariants({ variant: "ghost" }), 'text-3xl')}
                    >
                      Discover
                    </Link>
                    <Link
                      href="/login"
                      className={cn(buttonVariants({ variant: 'ghost' }), 'text-3xl')}
                    >
                      Login
                    </Link>
                  </>
                ) : (
                  <>
                    <Link
                      href="/send-gratitude"
                      className={cn(buttonVariants({ variant: 'ghost' }), 'text-3xl')}
                    >
                      Send
                    </Link>
                    <Link
                      href="/discover"
                      className={cn(buttonVariants({ variant: "ghost" }), 'text-3xl')}
                    >
                      Discover
                    </Link>
                    <Link
                      className={cn(buttonVariants({ variant: 'ghost' }), 'text-3xl')}
                      href="/profile"
                    >
                      Profile
                    </Link>
                    <Link
                      className={cn(buttonVariants({ variant: 'ghost' }), 'text-3xl')}
                      href="/"
                      onClick={e => {
                        e.preventDefault()
                        signOut()
                      }}>Logout</Link>
                  </>
                )}
                <ThemeToggle />
              </nav>
              <X
                onClick={() => setOpen(false)}
                className="absolute right-8 top-8 h-8 w-8 opacity-70"
              />
            </SheetContent>
          </Sheet>
        </div>

        {/* <MainNav items={siteConfig.mainNav} /> */}
      </div >
    </header >
  )
}
