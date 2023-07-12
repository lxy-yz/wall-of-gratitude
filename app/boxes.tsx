'use client'

import { GratitudeCard } from "@/components/gratitude-card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useCallback, useEffect, useState } from "react"
import { useDrag, useDrop, XYCoord } from "react-dnd"

export const Boxes = ({
  gratitudes,
  draggable = false
}: {
  gratitudes: any,
  draggable: boolean
}) => {
  const [boxes, setBoxes] = useState<{
    [key: string]: {
      top: number
      left: number
    }
  }>(
    draggable
      ? gratitudes.reduce((acc: Record<string, { left: number, top: number }>, e: any) => {
        return {
          ...acc,
          [e.id]: {
            top: e.top || 0,
            left: e.left || 0,
          }
        }
      }, {})
      : {}
  )

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

  async function resetAll() {
    return Promise.all(
      gratitudes.map((data: any) => {
        return savePosition(data.id, 0, 0)
      })
    )
  }

  return (
    <div className="space-y-6">
      {draggable && (
        <div className="flex justify-center">
          <Button variant="secondary" onClick={resetAll}>Reset All</Button>
        </div>
      )}
      <div ref={draggable ? drop : null} className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
        {gratitudes.map((data) => {
          return (
            <Box draggable={draggable} key={data.id} data={data} left={boxes[data.id]?.left} top={boxes[data.id]?.top} />
          )
        })}
      </div>
    </div>
  )
}

function Box({
  draggable,
  data,
  left,
  top
}: {
  draggable: boolean,
  data: any,
  left: number,
  top: number
}) {
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
      <div id={`box-${data.id}`} ref={draggable ? drag : null} style={{ left, top }} className="absolute left-0 top-0">
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
            tags={data.tags.map((tag: { name: string }) => tag.name)}
          />
        </Link>
      </div>
    </div>
  )
}