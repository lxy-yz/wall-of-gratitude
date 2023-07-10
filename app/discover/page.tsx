import { GratitudeCard } from "@/components/gratitude-card";
import { Badge } from "@/components/ui/badge";
import { db } from "@/lib/db";
import Link from "next/link";
import { Filters } from "./filters";

export async function DiscoverPage() {
  const gratitudes = await db.gratitude.findMany({
    take: 10,
    include: { from: true, to: true, tags: true }
  })

  const tags = await db.tag.findMany({
    take: 10,
  });

  return (
    <div className="mx-auto max-w-screen-lg">
      <h1 className="my-8 text-4xl font-bold tracking-tight">
        Discover
      </h1>
      <div className="grid grid-cols-3 gap-8">
        {gratitudes.map((data, i) => (
          <Link href={`/gratitudes/${data.id}`}>
            <GratitudeCard
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
      <Filters tags={tags} />
      <div className="mt-8 space-y-1">
        <h2 className="text-2xl font-semibold tracking-tight">
          Recent Sender
        </h2>
        <p className="text-sm text-muted-foreground">
          Top picks for you. Updated daily.
        </p>
      </div>
      <div className="mt-8 space-y-1">
        <h2 className="text-2xl font-semibold tracking-tight">
          Recent Receiver
        </h2>
        <p className="text-sm text-muted-foreground">
          Top picks for you. Updated daily.
        </p>
      </div>
    </div>
  );
}

export default DiscoverPage;