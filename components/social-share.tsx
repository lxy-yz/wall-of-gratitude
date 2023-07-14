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
        <Button variant="outline">
          <Share />
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
            {/* <a href="https://twitter.com/share?ref_src=twsrc%5Etfw" className="twitter-share-button" data-show-count="false">Tweet</a><script async src="https://platform.twitter.com/widgets.js" charSet="utf-8"></script> */}
            <TwitterShareButton
              url={link}
              title={'Spread some love here!'}
              className=""
            >
              <TwitterIcon size={48} round />
            </TwitterShareButton>
          </div>
          <div className="col-span-1 flex">
            <FacebookShareButton
              url={link}
              quote={'Spread some love here!'}
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
              variant="ghost"
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
