import { GratitudeCard } from "@/components/gratitude-card";
import { UserCard } from "@/components/user-card";
import { db } from "@/lib/db";
import { formatDate } from "@/lib/utils";
import Link from "next/link";
import { Filters } from "./filters";

export async function DiscoverPage({
  searchParams
}: {
  searchParams: {
    tag?: string
  }
}) {
  const gratitudes = await db.gratitude.findMany({
    where: {
      ...(searchParams.tag && {
        tags: {
          some: {
            name: searchParams.tag
          }
        }
      }),
    },
    take: 10,
    orderBy: {
      createdAt: 'desc'
    },
    include: { from: true, to: true, tags: true }
  })
  console.log('gratitudes', gratitudes.length);


  const senders = (await db.gratitude.findMany({
    select: {
      from: true
    },
    distinct: ['fromUserId'],
    orderBy: {
      createdAt: 'desc'
    },
    take: 5,
  }))
    .map(data => data.from)

  const receivers = (await db.gratitude.findMany({
    select: {
      to: true
    },
    distinct: ['toUserId'],
    orderBy: {
      createdAt: 'desc'
    },
    take: 5,
  }))
    .map(data => data.to)

  const tags = await db.tag.findMany({
    take: 10,
  });

  return (
    <div className="mx-auto max-w-screen-xl">
      <h1 className="my-8 text-2xl font-bold tracking-tight">
        Discover
      </h1>
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        <div className="mx-auto max-w-sm md:col-start-2 lg:col-start-3 xl:col-start-4">
          <div className="space-y-4">
            <h2 className="text-xl font-bold tracking-tight">
              Recents
            </h2>
            <div className="mt-8">
              <h3 className="font-semibold tracking-tight">
                Sender
              </h3>
              <div className="mt-4 space-y-4">
                {senders.map((data, i) => {
                  return (
                    <UserCard
                      key={i}
                      data={{
                        username: data.username as string,
                        bio: data.bio as string,
                        image: data.image as string,
                        name: data.name as string,
                        email: data.email as string,
                      }}
                    />
                  )
                })}
              </div>
              <h3 className="mt-8 font-semibold tracking-tight">
                Receiver
              </h3>
              <div className="mt-4 space-y-4">
                {receivers.map((data, i) => {
                  return (
                    <UserCard
                      key={i}
                      data={{
                        username: data.username as string,
                        bio: data.bio as string,
                        image: data.image as string,
                        name: data.name as string,
                        email: data.email as string,
                      }}
                    />
                  )
                })}
              </div>
            </div>
          </div>
        </div>
        <div className="md:row-start-1 lg:col-span-2 xl:col-span-3">
          <Filters tags={tags} />
          <div className="mt-8 grid gap-4 lg:grid-cols-2 xl:grid-cols-3">
            {gratitudes.map((data, i) => (
              <Link className="mx-auto" href={`/gratitudes/${data.id}`}>
                <GratitudeCard
                  className="h-[300px] w-[300px]"
                  color={data.bg}
                  typeface={data.typeface}
                  fontSize={data.fontSize}
                  from={data.from}
                  to={data.to}
                  content={data.content}
                  tags={data.tags.map((tag) => tag.name)}
                  date={formatDate(data.createdAt)}
                />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default DiscoverPage;