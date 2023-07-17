import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { db } from "@/lib/db"
import { Frown } from "lucide-react"
import { GratitudeDetail } from "./gratitude-detail"

export default async function GratitudeDetailPage({
  params: { id },
}: {
  params: { id: string }
}) {
  const data = await db.gratitude.findUnique({
    where: { id },
    include: {
      from: true,
      to: true,
      tags: true,
    }
  })

  if (!data) {
    return (
      <Alert className="mx-auto mt-10 max-w-screen-lg">
        <Frown className="h-4 w-4" />
        <AlertTitle>Whoops!</AlertTitle>
        <AlertDescription>No gratitude found.</AlertDescription>
      </Alert>
    )
  }

  return (
    <GratitudeDetail
      defaultOpen
      data={data}
    />
  )
}