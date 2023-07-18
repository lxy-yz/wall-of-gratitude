'use client'

import { GratitudeCard } from "@/components/gratitude-card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { toast } from "@/components/ui/use-toast"
import { formatDate, getInitialPositionForCard } from "@/lib/utils"
import { Terminal } from "lucide-react"
import { useCallback, useState } from "react"
import { useDrag, useDrop, XYCoord } from "react-dnd"
import { GratitudeDetail } from "./gratitudes/[id]/gratitude-detail"

export const Boxes = ({
  gratitudes,
  draggable = false,
  useSavedPosition = false,
}: {
  gratitudes: any,
  draggable: boolean
  useSavedPosition?: boolean
}) => {
  const [boxes, setBoxes] = useState<{
    [key: string]: {
      top: number
      left: number
    }
  }>(
    gratitudes.reduce((acc: Record<string, { left: number, top: number }>, e: any, index: number) => {
      const left = useSavedPosition ? e.left : getInitialPositionForCard(index).left
      const top = useSavedPosition ? e.top : getInitialPositionForCard(index).top

      return {
        ...acc,
        [e.id]: {
          top,
          left,
        }
      }
    }, {})
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
      gratitudes.map((data: any, index: number) => {
        const { left, top } = getInitialPositionForCard(index)
        return savePosition(data.id, left, top)
      })
    )
      .then(() => toast({
        title: "Successfully reset all positions",
      }))
      .then(() => location.reload())
  }

  return (
    <div className={`space-y-6`}>
      {draggable && (
        <Alert className="mx-auto mt-10 max-w-screen-lg">
          <Terminal className="h-4 w-4" />
          <AlertTitle>Heads up!</AlertTitle>
          <AlertDescription>
            You can drag and drop gratitude cards to reposition them. Or
            <Button className="px-1 text-red-500 font-bold" variant="link" onClick={resetAll}>reset</Button> them to their default positions.
          </AlertDescription>
        </Alert>
      )}
      <div ref={draggable ? drop : null} className={`${draggable ? 'border-4 border-dashed border-white' : ''} relative h-[1024px] overflow-y-auto p-8`}>
        {/* grid gap-4 md:grid-cols-2 lg:grid-cols-3 */}
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
    <div id={`box-${data.id}`} ref={draggable ? drag : null} style={{ left, top }} className="absolute">
      <GratitudeDetail
        data={data}
        sidePeek
        trigger={
          <GratitudeCard
            className="text-left"
            color={data.bg || 'blue'}
            typeface={data.typeface || 'font-sans'}
            fontSize={data.fontSize || 'text-base'}
            from={data.from}
            to={data.to}
            content={data.content}
            tags={data.tags.map((tag: { name: string }) => tag.name)}
            date={formatDate(data.createdAt)}
          />
        }
      />
    </div>
  )
}