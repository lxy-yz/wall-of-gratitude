import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { getCurrentUser } from "@/lib/auth"
import { db } from "@/lib/db"
import { User } from "@prisma/client"
import { Frown } from "lucide-react"
import { Boxes } from "../../boxes"

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
    <section className="-mx-4">
      <div className="flex w-full flex-col">
        <Tabs
          defaultValue="sent"
          className="pt-8 min-h-screen bg-cover bg-[url(https://images.unsplash.com/photo-1575108921107-8a15e73c9ff1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1671&q=80)]"
        >
          <div className="flex justify-center">
            <TabsList>
              <TabsTrigger value="sent">Sent</TabsTrigger>
              <TabsTrigger value="received">Received</TabsTrigger>
            </TabsList>
          </div>
          <TabsContent
            className="mt-10 py-12"
            value="sent"
          >
            <div className="mx-auto max-w-screen-lg space-y-8">
              <UserCard profile={profile} />
              <Boxes
                useSavedPosition
                draggable={(await getCurrentUser())?.id === profile.id}
                gratitudes={gratitudesSentByUser}
              />
            </div>
          </TabsContent>
          <TabsContent value="received" className="mt-4">
            <UserCard profile={profile} />
            <Boxes
              useSavedPosition
              draggable={(await getCurrentUser())?.id === profile.id}
              gratitudes={gratitudesReceivedByUser}
            />
          </TabsContent>
        </Tabs>
      </div>
    </section>
  )
}

function UserCard({ profile }: { profile: User }) {
  return (
    <div className="mx-auto w-[320px]">
      <Card className="border-0 text-center">
        <CardHeader>
          <CardTitle>
            <div className="flex flex-col items-center space-y-2">
              <Avatar className="h-40 w-40">
                <AvatarImage className="object-cover" src={profile.image as string} />
                <AvatarFallback>{ }</AvatarFallback>
              </Avatar>
              <p className="text-3xl leading-none">
                {profile.name}{' '}
                <span className="text-base text-gray-500 font-normal">(@{profile.username})</span>
              </p>
              <a href={`mailto:${profile.email}`}>
                📨
              </a>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent className="text-black dark:text-white">
          {profile.bio}
        </CardContent>
      </Card>
    </div>
  )
}