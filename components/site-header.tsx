'use client'
import Link from "next/link"

import { ThemeToggle } from "@/components/theme-toggle"
import { Button, buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { X } from "lucide-react"
import { signOut, useSession } from "next-auth/react"
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
    <header className="sticky top-0 z-40 w-full bg-transparent">
      <div className="">
        {/* <MainNav items={siteConfig.mainNav} /> */}

        <div className="">
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <div onClick={() => setOpen(true)}>
                <div className="fixed bottom-4 right-4">
                  <Button variant="ghost" className="rounded-full px-4 py-8 text-3xl">
                    🪐
                  </Button>
                </div>
              </div>
            </SheetTrigger>
            <SheetContent side={'top'} className='NavDialog h-full w-full'>
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
      </div >
    </header >
  )
}
