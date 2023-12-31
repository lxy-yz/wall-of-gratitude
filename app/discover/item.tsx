'use client'

import { GratitudeCard } from "@/components/gratitude-card"
import { formatDate } from "@/lib/utils"
import { useState } from "react"
import { GratitudeDetail } from "../gratitudes/[id]/gratitude-detail"

export const Item = ({ data }: { data: any }) => {
  const [open, setOpen] = useState(false)
  return (
    <div className="aspect-square">
      <GratitudeDetail
        sidePeek
        trigger={
          <GratitudeCard
            className="h-full w-full text-left"
            color={data.bg}
            typeface={data.typeface}
            fontSize={data.fontSize}
            from={data.from}
            to={data.to}
            content={data.content}
            tags={data.tags.map((tag: { name: string }) => tag.name)}
            date={formatDate(data.createdAt)}
          />
        }
        data={data}
      />
    </div>
  )
}