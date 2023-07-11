'use client'

import { Badge } from "@/components/ui/badge"
import { useRouter, useSearchParams } from "next/navigation"

export const Filters = ({ tags }: {
  tags: { id: string, name: string }[]
}) => {
  const searchParams = useSearchParams()
  const router = useRouter()

  return (
    <div className="space-x-2">
      <Badge
        onClick={() => {
          const newSearchParams = new URLSearchParams(searchParams)
          newSearchParams.delete('tag')
          router.push(`/discover?${newSearchParams}`)
        }}
        variant="outline"
        className="cursor-pointer"
      >
        all
      </Badge>
      {tags.map(tag => (
        <Badge
          onClick={() => {
            const newSearchParams = new URLSearchParams(searchParams)
            newSearchParams.set('tag', tag.name)
            router.push(`/discover?${newSearchParams}`)
          }}
          key={tag.id}
          variant="outline"
          className="cursor-pointer"
        >
          {tag.name}
        </Badge>
      ))}
    </div>
  )
}
