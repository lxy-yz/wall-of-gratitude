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
import React from "react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu"
import { Sheet, SheetClose, SheetContent, SheetFooter, SheetHeader, SheetTrigger } from "./ui/sheet"
import Image from "next/image"

const menuItems = [
  {
    title: "Dashboard",
    href: "/dashboard",
  }
]

export function SiteHeader() {
  const { data: sess } = useSession()

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background">
      <div className="container flex h-16 items-center space-x-4 justify-center sm:space-x-0">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline">
              <Image
                height={48}
                width={48}
                src="/icons/logo.png"
                alt="Logo"
              />
            </Button>
          </SheetTrigger>
          <SheetContent side={'bottom'}>
            <nav className="flex items-center justify-center space-x-4">
              {!sess ? (
                <Link href="/login">
                  <div
                    className={buttonVariants({
                      size: "sm",
                      variant: "ghost",
                    })}
                  >
                    Login
                  </div>
                </Link>
              ) : (
                <>
                  <Link
                    href="/send-gratitude"
                    className={cn(buttonVariants({ variant: 'ghost' }))}
                  >
                    Send
                  </Link>
                  <Link
                    className={cn(buttonVariants({ variant: 'ghost' }))}
                    href="/profile"
                  >
                    Profile
                  </Link>
                  {/* <Link href="/discover">Discover</Link>  */}
                  <Link
                    className={cn(buttonVariants({ variant: 'ghost' }))}
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
        <MainNav items={siteConfig.mainNav} />

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