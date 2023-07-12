'use client'

import { GratitudeCard } from "@/components/gratitude-card"
import Link from "next/link"
import { useCallback, useEffect, useState } from "react"
import { useDrag, useDrop, XYCoord } from "react-dnd"

export const Boxes = ({
  gratitudes
}: {
  gratitudes: any
}) => {
  const [boxes, setBoxes] = useState<{
    [key: string]: {
      top: number
      left: number
    }
  }>(gratitudes.reduce((acc: Record<string, { left: number, top: number }>, e: any) => {
    return {
      ...acc,
      [e.id]: {
        top: e.top || 0,
        left: e.left || 0,
      }
    }
  }, {}))

  const moveBox = useCallback(
    (id: string, left: number, top: number) => {
      setBoxes({
        ...boxes,
        [id]: {
          left,
          top
        },
      })
    },
    [boxes, setBoxes],
  )

  const [, drop] = useDrop(
    () => ({
      accept: 'box',
      drop(item: {
        type: string
        id: string
        top: number
        left: number
      }, monitor) {
        const delta = monitor.getDifferenceFromInitialOffset() as XYCoord
        const left = Math.round((item.left ?? 0) + delta.x)
        const top = Math.round((item.top ?? 0) + delta.y)
        moveBox(item.id, left, top)
        savePosition(item.id, left, top)
        return undefined
      },
    }),
    [moveBox],
  )

  async function savePosition(id: string, left: number, top: number,) {
    await fetch(`/api/gratitude/${id}/move`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ left, top })
    })
  }

  return (
    <div ref={drop} className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
      {gratitudes.map((data, i) => {
        return (
          <Box key={i} data={data} setBoxes={setBoxes} left={boxes[data.id].left} top={boxes[data.id].top} />
        )
      })}
    </div>
  )
}

function Box({ setBoxes, data, left, top }: { setBoxes: any, data: any, left: number, top: number }) {
  const [{ isDragging }, drag] = useDrag(
    () => ({
      type: 'box',
      item: { id: data.id, left, top },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
    }),
    [data.id, left, top],
  )

  if (isDragging) {
    return <div ref={drag} />
  }

  return (
    <div className="relative mx-auto h-[320px] w-full">
      <div id={`box-${data.id}`} ref={drag} style={{ left, top }} className="absolute left-0 top-0">
        <Link
          href={`/gratitudes/${data.id}`} className="">
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
            content={data.content}
            tags={data.tags.map((tag) => tag.name)}
          />
        </Link>
      </div>
    </div>
  )
}