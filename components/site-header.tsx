'use client'
import Link from "next/link"

import { siteConfig } from "@/config/site"
import { Button, buttonVariants } from "@/components/ui/button"
import { MainNav } from "@/components/main-nav"
import { ThemeToggle } from "@/components/theme-toggle"
import { signOut, useSession } from "next-auth/react"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger } from "./ui/navigation-menu"
import { cn } from "@/lib/utils"
import React, { useCallback, useEffect, useState } from "react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu"
import { Sheet, SheetClose, SheetContent, SheetFooter, SheetHeader, SheetTrigger } from "./ui/sheet"
import Image from "next/image"
import { useRouter } from "next/router"
import { usePathname, useSearchParams } from "next/navigation"

const menuItems = [
  {
    title: "Dashboard",
    href: "/dashboard",
  }
]

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
            <SheetContent side={'top'} className='h-full w-full'>
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
                    {/* <DropdownMenu>
                  <DropdownMenuTrigger>Open</DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem>
                      <Link href="/profile">
                        Profile
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>Billing</DropdownMenuItem>
                    <DropdownMenuItem>Team</DropdownMenuItem>
                    <DropdownMenuItem>Subscription</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu> */}
                    {/* <NavigationMenu>
                    <NavigationMenuList>
                      <NavigationMenuItem>
                        <NavigationMenuTrigger className="!bg-none">
                          <Avatar className="h-10 w-10">
                            <AvatarImage src={sess!.user.image as string} />
                            <AvatarFallback>{ }</AvatarFallback>
                          </Avatar>
                        </NavigationMenuTrigger>
                        <NavigationMenuContent>
                          <ul className="grid w-[200px] p-3">
                            <ListItem title="Profile" href="/profile" />
                            <ListItem title="Discover" href="/discover" />
                            <ListItem title="Logout" href="/" onClick={e => {
                              e.preventDefault()
                              signOut()
                            }} />
                          </ul>
                        </NavigationMenuContent>
                      </NavigationMenuItem>
                    </NavigationMenuList>
                  </NavigationMenu> */}
                  </>
                )}
                <ThemeToggle />
              </nav>
              <SheetFooter>
                <SheetClose asChild>
                </SheetClose>
              </SheetFooter>
            </SheetContent>
          </Sheet>
        </div>

      </div >
    </header >
  )
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <Link
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </Link>
      </NavigationMenuLink>
    </li>
  )
})
ListItem.displayName = "ListItem"