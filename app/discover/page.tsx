import { SiteFooter } from "@/components/site-footer";
import { UserCard } from "@/components/user-card";
import { db } from "@/lib/db";
import { Filters } from "./filters";
import { Item } from "./item";

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
    // take: 10,
    orderBy: {
      createdAt: 'desc'
    },
    include: { from: true, to: true, tags: true }
  })

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
    <>
      <div className="md:px-4">
        <h1 className="mb-8 text-2xl font-bold tracking-tight">
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
            <div className="mt-8 grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3">
              {gratitudes.map((data, i) => (
                <Item data={data} />
              ))}
            </div>
          </div>
        </div>
      </div>
      <SiteFooter className="mt-10 md:mx-4" />
    </>
  );
}

export default DiscoverPage;