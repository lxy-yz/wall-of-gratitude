'use client'

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog"
import { Share } from "lucide-react"
import { useState } from "react"
import { FacebookIcon, FacebookShareButton, TwitterIcon, TwitterShareButton } from "react-share"
import { Input } from "./ui/input"
import { Separator } from "./ui/separator"

export function SocialShare({
  link = typeof window !== undefined ? window.location.href : "",
}: {
  link?: string
}) {
  const [copySuccess, setCopySuccess] = useState(false)

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="flex items-center gap-2">
          Share
          <Share className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Share</DialogTitle>
          <DialogDescription>
            Share to your friends
          </DialogDescription>
        </DialogHeader>
        <div className="grid grid-cols-4 gap-4 py-4">
          <div></div>
          <div className="col-span-1 flex justify-end">
            <TwitterShareButton
              url={link}
              title={'I shared my gratitude!'}
              hashtags={["Gratitude"]}
              className=""
            >
              <TwitterIcon size={48} round />
            </TwitterShareButton>
          </div>
          <div className="col-span-1 flex">
            <FacebookShareButton
              url={link}
              quote={'I shared my gratitude!'}
              className=""
            >
              <FacebookIcon size={48} round />
            </FacebookShareButton>
          </div>
          <div></div>
        </div>
        <Separator />
        <DialogFooter className="flex !flex-col">
          <div className="relative">
            <Input disabled value={link} />
            <Button
              variant="secondary"
              className="absolute right-0 top-0"
              onClick={async () => {
                await navigator.clipboard.writeText(link)
                setCopySuccess(true)
                setTimeout(() => {
                  setCopySuccess(false)
                }, 2000)
              }}
            >
              {copySuccess ? "copied ✔" : 'copy link'}
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
