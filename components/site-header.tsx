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
  const isUserPage = pathname.startsWith('/u/')

  return (
    <header
      ref={stickyRef}
      className={cn("top-0 z-40 w-full",
        isUserPage ? "fixed bg-transparent" : "sticky bg-white",
      )}>
      <div className="flex">
        <div className="">
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <div onClick={() => setOpen(true)}>
                <div className="p-4">
                  <Icon className={`${isUserPage ? 'text-white' : ''} h-8 w-8 cursor-pointer font-bold`} icon="fluent:panel-left-text-20-regular" />
                </div>
              </div>
            </SheetTrigger>
            <SheetContent side={'left'} className='NavDialog h-full w-full'>
              <div className="relative flex justify-center">
                <Image
                  className="absolute"
                  src='/icons/logo.png'
                  alt='logo'
                  width={100}
                  height={100}
                />
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
