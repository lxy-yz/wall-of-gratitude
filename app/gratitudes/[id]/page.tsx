import { GratitudeCard } from "@/components/gratitude-card"
import { SocialShare } from "@/components/social-share"
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { db } from "@/lib/db"

export default async function GratitudeDetailPage({
  params: { id },
}: {
  params: { id: string }
}) {
  const data = await db.gratitude.findFirst({
    where: { id },
    include: {
      from: true,
      to: true,
    }
  })

  return (
    <div>
      <h1>Gratitude Detail</h1>
      <p>
        Find me in <code>./web/src/pages/GratitudeDetailPage/GratitudeDetailPage.tsx</code>
      </p>
      <p>
        My default route is named <code>gratitudeDetail</code>, link to me with `
        {/* <Link to={routes.gratitudeDetail()}>GratitudeDetail</Link>` */}
      </p>
      <SocialShare />
      <section>
        <GratitudeCard
          color={data?.bg || 'blue'}
          typeface={data?.typeface || 'font-sans'}
          fontSize={data?.fontSize || 'text-base'}
          from={{
            email: data?.from.email as string,
            name: data?.from.name as string,
            username: data?.from.username as string,
          }}
          to={{
            email: data?.to.email as string,
            name: data?.to.name as string,
            image: data?.to.image as string,
          }}
          content={data?.content as string}
          tags={data?.tags?.map((tag) => tag.name) || []}
        />
      </section>
      <Table>
        <TableCaption>A list of your recent invoices.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Status</TableHead>
            <TableHead>Method</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell className="font-medium">From</TableCell>
            <TableCell>Paid</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">To</TableCell>
            <TableCell>Paid</TableCell>
          </TableRow><TableRow>
            <TableCell className="font-medium">Words</TableCell>
            <TableCell>Paid</TableCell>
          </TableRow><TableRow>
            <TableCell className="font-medium">Tags</TableCell>
            <TableCell>Paid</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  )
}