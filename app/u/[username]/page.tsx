import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { getCurrentUser } from "@/lib/auth"
import { db } from "@/lib/db"
import { Frown } from "lucide-react"
import { DragAndDrop } from "./drag-and-drop"
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
          className="min-h-screen"
        >
          <div className="flex flex-col md:flex-row">
            <div className="mx-auto flex w-[350px] flex-col justify-center px-4 md:sticky md:top-0 md:order-2 md:h-screen">
              <div className="mt-12">
                <UserCard profile={profile} />
              </div>
              <div className="mb-12 mt-4 flex justify-center">
                <TabsList>
                  <TabsTrigger value="sent">Sent</TabsTrigger>
                  <TabsTrigger value="received">Received</TabsTrigger>
                </TabsList>
              </div>
            </div>
            <div className="bg-[url('/bg.jpg')] bg-contain px-4 md:order-1 md:flex-1">
              <TabsContent value="sent">
                <div className="mx-auto max-w-screen-lg">
                  <DragAndDrop
                    useSavedPosition
                    draggable={(await getCurrentUser())?.id === profile.id}
                    data={gratitudesSentByUser}
                  />
                </div>
              </TabsContent>
              <TabsContent value="received">
                <div className="mx-auto max-w-screen-lg">
                  <DragAndDrop
                    useSavedPosition
                    draggable={(await getCurrentUser())?.id === profile.id}
                    data={gratitudesReceivedByUser}
                  />
                </div>
              </TabsContent>
            </div>
          </div>
        </Tabs>
      </div>
    </section >
  )
}
