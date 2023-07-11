import { GratitudeCard } from "@/components/gratitude-card";
import { Badge } from "@/components/ui/badge";
import { UserCard } from "@/components/user-card";
import { db } from "@/lib/db";
import Link from "next/link";
import { Filters } from "./filters";

export async function DiscoverPage() {
  const gratitudes = await db.gratitude.findMany({
    take: 10,
    orderBy: {
      createdAt: 'desc'
    },
    include: { from: true, to: true, tags: true }
  })

  const tags = await db.tag.findMany({
    take: 10,
  });

  return (
    <div className="mx-auto max-w-screen-xl">
      <h1 className="my-8 text-4xl font-bold tracking-tight">
        Discover
      </h1>
      <div className="grid gap-8 md:grid-cols-3 xl:grid-cols-4">
        <div className="md:col-span-3 xl:col-span-1 xl:col-start-4">
          <div className="space-y-4">
            <h2 className="text-2xl font-bold tracking-tight">
              Recents
            </h2>
            <div className="mt-8">
              <h3 className="font-semibold tracking-tight">
                Sender
              </h3>
              <div className="mt-4 space-y-4">
                {gratitudes.map((data, i) => {
                  // console.log('data.from', data.from);

                  return (
                    <UserCard
                      key={i}
                      data={{
                        image: data.from.image as string,
                        name: data.from.name as string,
                        email: data.from.email as string,
                      }}
                    />
                  )
                })}
              </div>
              <h3 className="mt-8 font-semibold tracking-tight">
                Receiver
              </h3>
              <div className="mt-4 space-y-4">
                {gratitudes.map((data, i) => {
                  // console.log('data.to', data.to);

                  return (
                    <UserCard
                      key={i}
                      data={{
                        image: data.to.image as string,
                        name: data.to.name as string,
                        email: data.to.email as string,
                      }}
                    />
                  )
                })}
              </div>
            </div>
          </div>
        </div>
        <div className="md:col-span-3 xl:row-start-1">
          <Filters tags={tags} />
          <div className="mt-4 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
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