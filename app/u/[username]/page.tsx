import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { getCurrentUser } from "@/lib/auth"
import { db } from "@/lib/db"
import { Frown } from "lucide-react"
import { Boxes } from "../../boxes"
import { UserCard } from "./user-card"

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

  const gratitudesSentByUser = (await db.gratitude.findMany({
    where: {
      fromUserId: profile.id
    },
    include: {
      from: true,
      to: true,
      tags: true
    }
  }))
    .map((gratitude) => ({
      ...gratitude,
      left: gratitude.fromPosition[0],
      top: gratitude.fromPosition[1]
    }))

  const gratitudesReceivedByUser = (await db.gratitude.findMany({
    where: {
      toUserId: profile.id
    },
    include: {
      from: true,
      to: true,
      tags: true
    }
  }))
    .map((gratitude) => ({
      ...gratitude,
      left: gratitude.toPosition[0],
      top: gratitude.toPosition[1]
    }))


  return (
    <section className="-mx-4">
      <div className="flex w-full flex-col">
        <Tabs
          defaultValue="sent"
          className="pb-16 min-h-screen bg-cover bg-[url(https://images.unsplash.com/photo-1575108921107-8a15e73c9ff1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1671&q=80)]"
        >
          <div className="mt-32">
            <UserCard profile={profile} />
          </div>
          <div className="mb-12 mt-4 flex justify-center">
            <TabsList>
              <TabsTrigger value="sent">Sent</TabsTrigger>
              <TabsTrigger value="received">Received</TabsTrigger>
            </TabsList>
          </div>
          <TabsContent value="sent">
            <div className="mx-auto max-w-screen-lg">
              <Boxes
                useSavedPosition
                draggable={(await getCurrentUser())?.id === profile.id}
                gratitudes={gratitudesSentByUser}
              />
            </div>
          </TabsContent>
          <TabsContent value="received">
            <div className="mx-auto max-w-screen-lg">
              <Boxes
                useSavedPosition
                draggable={(await getCurrentUser())?.id === profile.id}
                gratitudes={gratitudesReceivedByUser}
              />
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  )
}
