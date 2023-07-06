import Link from "next/link"

import { siteConfig } from "@/config/site"
import { buttonVariants } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"
import { Edit, Share, Trash2 } from "lucide-react"
import { GratitudeCard } from "@/components/gratitude-card"

export default function IndexPage() {
  return (
    <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
      <div className="flex max-w-[980px] flex-col items-start gap-2">
        <h1 className="text-3xl font-extrabold leading-tight tracking-tighter md:text-4xl">
          Beautifully designed components <br className="hidden sm:inline" />
          built with Radix UI and Tailwind CSS.
        </h1>
        <p className="max-w-[700px] text-lg text-muted-foreground">
          Accessible and customizable components that you can copy and paste
          into your apps. Free. Open Source. And Next.js 13 Ready.
        </p>
      </div>
      <div className="mx-auto flex max-w-screen-lg w-full flex-col">
        {/* <GratitudeEmail /> */}
        <Card className="text-center">
          <CardHeader>
            <CardTitle>
              <div className="flex flex-col items-center space-y-4">
                <Avatar className="h-20 w-20">
                  <AvatarImage src="/avatars/01.png" />
                  <AvatarFallback>OM</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium leading-none">Sofia Davis</p>
                  <p className="text-sm text-muted-foreground">m@example.com</p>
                </div>
              </div>
            </CardTitle>
            <CardDescription className="">
              Invite your team members to collaborate.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-6">
            <div className="flex items-center justify-between space-x-4">

            </div>
          </CardContent>
        </Card>
        <Tabs defaultValue="sent" className="mt-4">
          <div className="flex justify-center">
            <TabsList>
              <TabsTrigger value="sent">Sent</TabsTrigger>
              <TabsTrigger value="received">Received</TabsTrigger>
            </TabsList>
          </div>
          <TabsContent className="mt-10" value="sent">
            <div className="grid gap-8 grid-cols-3 grid-rows-3">
              {Array.from({ length: 9 }).map((_, i) => (
                <Card className={cn("px-6 py-3 flex flex-col max-w-[] w-[300px] h-[300px]", `bg-blue-300`, `font-cursive`, `text-xl`)}>
                  <div className="">
                    <div className="flex items-center gap-2">
                      <Avatar className="">
                        <AvatarImage src="/avatars/01.png" />
                        <AvatarFallback>OM</AvatarFallback>
                      </Avatar>
                      <div className="order-1">
                        <p className="text-sm font-medium leading-none">Sofia Davis</p>
                        <p className="text-sm text-muted-foreground">m@example.com</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex-1 flex flex-col justify-center gap-4">
                    Thanks for being a great friend!
                    <CardDescription className="">
                      <div>
                        2021/10/10
                      </div>
                      <div>
                        #eaeaea #cool #awesome
                      </div>
                    </CardDescription>
                  </div>
                  <div className="">
                    <div className="flex gap-2">
                      <Share className="h-4 w-4" />
                      <Edit className="h-4 w-4" />
                      <Trash2 className="h-4 w-4" />
                    </div>
                    {/* <div className="flex justify-end items-center gap-2">
                      <Avatar className="order-1">
                        <AvatarImage src="/avatars/01.png" />
                        <AvatarFallback>OM</AvatarFallback>
                      </Avatar>
                      <div className="">
                        <p className="text-sm font-medium leading-none">Sofia Davis</p>
                        <p className="text-sm text-muted-foreground">m@example.com</p>
                      </div>
                    </div> */}
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>
          <TabsContent value="received" className="mt-4">
            <div className="grid gap-8 grid-cols-3 grid-rows-3">
              {Array.from({ length: 9 }).map((_, i) => (
                <GratitudeCard
                  color="blue"
                  typeface="cursive"
                  fontSize="lg"
                  to=""
                  content="Thanks for being a great friend!"
                  tags={["cool", "awesome"]}
                />
                // <Card className={cn("max-w-[] w-[300px] h-[300px]", `bg-blue-300`, `font-cursive`, `text-xl`)}>
                //   <CardHeader>
                //     <div className="flex items-center gap-2">
                //       <Avatar className="">
                //         <AvatarImage src="/avatars/01.png" />
                //         <AvatarFallback>OM</AvatarFallback>
                //       </Avatar>
                //       <div className="order-1">
                //         <p className="text-sm font-medium leading-none">Sofia Davis</p>
                //         <p className="text-sm text-muted-foreground">m@example.com</p>
                //       </div>
                //     </div>
                //   </CardHeader>
                //   <CardContent className="grid gap-6">
                //     Thanks for being a great friend!
                //   </CardContent>
                //   <CardDescription className="px-6">
                //     <div>
                //       2021/10/10
                //     </div>
                //     <div>
                //       #eaeaea #cool #awesome
                //     </div>
                //   </CardDescription>
                //   <CardFooter>
                //     Footer
                //   </CardFooter>
                // </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>

      </div>
    </section>
  )
}
