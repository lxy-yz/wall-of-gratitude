import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { GratitudeCard } from "@/components/gratitude-card"
import { db } from "@/lib/db"
import { getCurrentUser } from "@/lib/auth"
import { Boxes } from "../../boxes"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Frown } from "lucide-react"

export default async function UserPage({
  params: { username },
}: {
  params: { username: string }
}) {
  const profile = await db.user.findFirst({ where: { username } })
  if (!profile) {
    return (
      <Alert className="mx-auto mt-10 max-w-screen-lg">
        <Frown className="h-4 w-4" />
        <AlertTitle>Whoops!</AlertTitle>
        <AlertDescription>No user found.</AlertDescription>
      </Alert>
    )
  }

  const gratitudesSentByUser = await db.gratitude.findMany({
    where: {
      fromUserId: profile.id
    },
    include: {
      from: true,
      to: true,
      tags: true
    }
  })
  const gratitudesReceivedByUser = await db.gratitude.findMany({
    where: {
      toUserId: profile.id
    },
    include: {
      from: true,
      to: true,
      tags: true
    }
  })

  return (
    <section className="-mx-4 grid items-center gap-6 pb-8 pt-6 md:py-10">
      <div className="flex w-full flex-col">
        <Card className="border-0 bg-transparent text-center shadow-none">
          <CardHeader>
            <CardTitle>
              <div className="flex flex-col items-center space-y-4">
                <Avatar className="h-40 w-40">
                  <AvatarImage src={profile?.image as string} />
                  <AvatarFallback>{ }</AvatarFallback>
                </Avatar>
                <div className="space-y-2">
                  <p className="text-3xl leading-none">
                    {profile?.name}{' '}
                    <span className="text-base font-medium leading-none">(@{profile?.username})</span>
                  </p>
                  <p className="text-base">{profile?.email}</p>
                </div>
              </div>
            </CardTitle>
            <CardDescription className="">{profile?.bio}</CardDescription>
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
          <TabsContent
            className="mt-10 py-12 bg-cover bg-[url(https://images.unsplash.com/photo-1575108921107-8a15e73c9ff1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1671&q=80)]"
            value="sent"
          >
            <div className="mx-auto max-w-screen-lg">
              <Boxes
                useSavedPosition
                draggable={(await getCurrentUser())?.id === profile.id}
                gratitudes={gratitudesSentByUser}
              />
            </div>
          </TabsContent>
          <TabsContent value="received" className="mt-4">
            <div className="grid grid-cols-3 grid-rows-3 gap-8">
              {gratitudesReceivedByUser.map((data, i) => (
                <GratitudeCard
                  color={data.bg || 'blue'}
                  typeface={data.typeface || 'font-sans'}
                  fontSize={data.fontSize || 'text-base'}
                  from={{
                    email: data.from.email as string,
                    name: data.from.name as string,
                  }}
                  to={{
                    email: data.to.email as string,
                    name: data.to.name as string,
                    image: data.to.image as string,
                  }}
                  content={data.content}
                  tags={data.tags.map((tag) => tag.name)}
                />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  )
}
