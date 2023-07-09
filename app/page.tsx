import Link from "next/link"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"
import { Edit, Share, Trash2 } from "lucide-react"
import { GratitudeCard } from "@/components/gratitude-card"
import { db } from "@/lib/db"
import { getCurrentUser } from "@/lib/auth"

export default async function IndexPage() {
  const user = await getCurrentUser()
  const gratitudesSentByUser = await db.gratitude.findMany({
    where: {
      fromUserId: user!.id
    },
    include: {
      from: true,
      to: true,
      tags: true
    }
  })
  const gratitudesReceivedByUser = await db.gratitude.findMany({
    where: {
      toUserId: user!.id
    },
    include: {
      from: true,
      to: true,
      tags: true
    }
  })
  console.log(gratitudesSentByUser, gratitudesReceivedByUser);


  return (
    <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
      <div className="mx-auto flex w-full max-w-screen-lg flex-col">
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
                      {/* <Edit className="h-4 w-4" /> */}
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
            <div className="grid grid-cols-3 grid-rows-3 gap-8">
              {gratitudesReceivedByUser.map((data, i) => (
                <GratitudeCard
                  color={data.bg}
                  typeface={data.typeface}
                  fontSize={data.fontSize}
                  from={data.from.name}
                  to={data.to.name}
                  content={data.content}
                  tags={data.tags.map((tag) => tag.name)}
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
