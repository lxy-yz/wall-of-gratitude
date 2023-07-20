'use client'

import { GratitudeCard } from "@/components/gratitude-card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { toast } from "@/components/ui/use-toast"
import { useMediaQuery } from "@/lib/hooks"
import { formatDate, getInitialPositionForCard } from "@/lib/utils"
import { Terminal } from "lucide-react"
import { useCallback, useState } from "react"
import { useDrag, useDrop, XYCoord } from "react-dnd"
import { GratitudeDetail } from "../../gratitudes/[id]/gratitude-detail"

export const DragAndDrop = ({
  data,
  draggable = false,
  useSavedPosition = false,
}: {
  data: any,
  draggable: boolean
  useSavedPosition?: boolean
}) => {
  const [boxes, setBoxes] = useState<{
    [key: string]: {
      top: number
      left: number
    }
  }>(
    data.reduce((acc: Record<string, { left: number, top: number }>, e: any, index: number) => {
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
      data.map((data: any, index: number) => {
        const { left, top } = getInitialPositionForCard(index)
        return savePosition(data.id, left, top)
      })
    )
      .then(() => toast({
        title: "✅ Successfully reset all positions.",
      }))
      .then(() => location.reload())
  }

  const editable = useMediaQuery('(min-width: 600px)') && draggable

  return (
    <div className={`space-y-6 py-16`}>
      <div ref={editable ? drop : null} className={`${editable ? 'border-4 border-dashed border-white' : ''} relative h-[1024px] overflow-y-auto p-8`}>
        {data.map((e: any) => {
          return (
            <Box
              draggable={editable}
              key={e.id}
              data={e}
              left={boxes[e.id]?.left}
              top={boxes[e.id]?.top}
            />
          )
        })}
      </div>
      {editable && (
        <Alert className="mx-auto mt-10 max-w-screen-lg">
          <Terminal className="h-4 w-4" />
          <AlertTitle>Heads up!</AlertTitle>
          <AlertDescription>
            You can drag and drop gratitude cards to reposition them. Or
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button className="px-1 font-bold text-red-500" variant="link">
                  reset
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Confirmation</AlertDialogTitle>
                  <AlertDialogDescription>
                    Are you sure to reset all positions?
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction>
                    <Button
                      onClick={resetAll}
                    >
                      Ok
                    </Button>
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
            them to their default positions.
          </AlertDescription>
        </Alert>
      )}
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
            color={data.bg}
            typeface={data.typeface}
            fontSize={data.fontSize}
            from={data.from}
            to={data.to}
            content={data.content}
            tags={data.tags.map((tag: any) => tag.name)}
            date={formatDate(data.createdAt)}
          />
        }
      />
    </div>
  )
}
