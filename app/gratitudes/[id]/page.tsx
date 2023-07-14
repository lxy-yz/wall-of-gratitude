import { GratitudeCard } from "@/components/gratitude-card"
import { SocialShare } from "@/components/social-share"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table"
import { db } from "@/lib/db"
import { Frown } from "lucide-react"
import Image from 'next/image'

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
    <div className="mx-auto mt-20 flex max-w-screen-lg flex-wrap gap-4">
      <div className="w-full md:w-1/2">
        <h2 className="mt-6 text-2xl font-bold">Spread kindness</h2>
        <p className="mt-2 text-muted-foreground">One sticky note at a time</p>
        <div className="mt-4 flex items-center justify-center">
          <div className="flex justify-end">
            <Avatar className="h-20 w-20">
              <AvatarImage src={data.from.image as string} />
              <AvatarFallback></AvatarFallback>
            </Avatar>
          </div>
          <Image
            className="flex items-center"
            src='/right_arrow.png'
            alt='right arrow'
            width={200}
            height={100}
          />
          <div className="flex">
            <Avatar className="h-20 w-20">
              <AvatarImage src={data.to.image as string} />
              <AvatarFallback></AvatarFallback>
            </Avatar>
          </div>
        </div>
        <Table className="mt-8">
          <TableBody>
            <TableRow>
              <TableCell className="text-xl">📨</TableCell>
              <TableCell align="right">{'@' + data.from.username}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="text-xl">📥</TableCell>
              <TableCell align="right">{data.to.username ? ('@' + data.to.username) : '@unknown'}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="text-xl">💌</TableCell>
              <TableCell align="right">{data.content}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="">
                <span className="text-xl">
                  🏷️
                </span>
              </TableCell>
              <TableCell align="right">{data.tags.map(tag => tag.name).join(',')}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium"></TableCell>
              <TableCell align="right">
                <SocialShare />
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
      <Separator orientation="vertical" className="" />
      <section className="flex flex-1 items-center justify-center">
        <GratitudeCard
          color={data.bg || 'blue'}
          typeface={data.typeface || 'font-sans'}
          fontSize={data.fontSize || 'text-base'}
          from={{
            email: data.from.email as string,
            name: data.from.name as string,
            username: data.from.username as string,
          }}
          to={{
            email: data.to.email as string,
            name: data.to.name as string,
            image: data.to.image as string,
          }}
          content={data.content as string}
          tags={data.tags?.map((tag) => tag.name) || []}
        />
      </section>
    </div>
  )
}