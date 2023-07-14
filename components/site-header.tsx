'use client'
import Link from "next/link"

import { ThemeToggle } from "@/components/theme-toggle"
import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { X } from "lucide-react"
import { signOut, useSession } from "next-auth/react"
import Image from "next/image"
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

  return (
    <header className="sticky top-0 z-40 w-full bg-background">
      <div className="">
        {/* <MainNav items={siteConfig.mainNav} /> */}

        <div className="fixed bottom-[40px] right-[40px]">
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <div onClick={() => setOpen(true)} className="cursor-pointer text-3xl">
                🧭
              </div>
            </SheetTrigger>
            <SheetContent side={'top'} className='NavDialog h-full w-full'>
              <nav className="flex h-full flex-col items-center justify-center gap-3 font-extrabold text-slate-600">
                {!sess ? (
                  <>
                    <Image
                      height={100}
                      width={100}
                      src="/icons/logo.png"
                      alt="Logo"
                    />
                    <Link
                      href="/login"
                      className={cn(buttonVariants({ variant: "ghost" }), 'text-3xl')}
                    >
                      Login
                    </Link>
                  </>
                ) : (
                  <>
                    <Image
                      height={100}
                      width={100}
                      src="/icons/logo.png"
                      alt="Logo"
                    />
                    <Link
                      href="/"
                      className={cn(buttonVariants({ variant: "ghost" }), 'text-3xl')}
                    >
                      Home
                    </Link>
                    <Link
                      href="/send-gratitude"
                      className={cn(buttonVariants({ variant: 'ghost' }), 'text-3xl')}
                    >
                      Send
                    </Link>
                    <Link
                      className={cn(buttonVariants({ variant: 'ghost' }), 'text-3xl')}
                      href="/profile"
                    >
                      Profile
                    </Link>
                    {/* <Link href="/discover">Discover</Link>  */}
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
      </div >
    </header >
  )
}
