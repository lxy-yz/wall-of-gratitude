'use client'

import { GratitudeCard } from "@/components/gratitude-card"
import { SocialShare } from "@/components/social-share"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { toast } from "@/components/ui/use-toast"
import { UserCard } from "@/components/user-card"
import { useMediaQuery } from "@/lib/hooks"
import { formatDate } from "@/lib/utils"
import { DialogClose } from "@radix-ui/react-dialog"
import { Quote, Send } from "lucide-react"
import { useSession } from "next-auth/react"
import { usePathname, useRouter } from "next/navigation"
import { useState } from "react"

export const GratitudeDetail = ({
  defaultOpen,
  trigger,
  sidePeek,
  data,
}: {
  defaultOpen?: boolean
  trigger?: React.ReactNode
  sidePeek?: boolean
  data: any
}) => {
  const RootTag = sidePeek ? Sheet : Dialog
  const TriggerTag = sidePeek ? SheetTrigger : DialogTrigger
  const ContentTag = sidePeek ? SheetContent : DialogContent
  const HeaderTag = sidePeek ? SheetHeader : DialogHeader
  const TitleTag = sidePeek ? SheetTitle : DialogTitle
  const DescriptionTag = sidePeek ? SheetDescription : DialogDescription
  const FooterTag = sidePeek ? SheetFooter : DialogFooter
  const CloseTag = sidePeek ? SheetClose : DialogClose

  const { data: sess } = useSession()
  const canSendEmail = sess?.user.id === data.from.id
  const [sending, setSending] = useState(false)
  async function handleSendEmail() {
    setSending(true)
    try {
      const res = await fetch("/api/email/send", {
        method: "POST",
        body: JSON.stringify({
          gratitudeId: data.id
        }),
      })
      if (res.ok)
        toast({ title: '✅ Email succesfully sent.' })
      else
        throw new Error(await res.text())
    } catch (err) {
      console.error(err)
      toast({ title: '❌ Email failed to sent.' })
    }
    setSending(false)
  }

  const router = useRouter()
  const pathname = usePathname()

  const isMobile = useMediaQuery("(max-width: 600px)")
  const shareLink = (new URL("/gratitudes/" + data.id, window.location)).toString()
  
  return (
    <RootTag defaultOpen={defaultOpen} onOpenChange={(open) => {
      if (!open && pathname.startsWith('/gratitudes/')) {
        router.push('/discover')
      }
    }}>
      <TriggerTag className="h-full w-full">{trigger}</TriggerTag>
      <ContentTag className={`${isMobile ? 'max-h-[600px]' : ''} overflow-auto`} side={isMobile ? 'bottom' : 'right'}>
        <HeaderTag>
          <TitleTag>Spread a little kindness</TitleTag>
          <DescriptionTag>One sticky note at a time</DescriptionTag>
        </HeaderTag>

        <div className="grid gap-4 py-8">
          <div className="grid grid-cols-4 gap-4">
            <div className="text-sm font-semibold">
              From
            </div>
            <div className="col-span-3">
              <UserCard data={data.from} />
            </div>
          </div>
          <div className="grid grid-cols-4 gap-4">
            <div className="text-sm font-semibold">
              To
            </div>
            <div className="col-span-3">
              <UserCard data={data.to} />
            </div>
          </div>
        </div>

        <div className="flex flex-col">
          <Quote />
          <section className="my-4 flex flex-1 items-center justify-center">
            <GratitudeCard
              color={data.bg || 'blue'}
              typeface={data.typeface || 'font-sans'}
              fontSize={data.fontSize || 'text-base'}
              from={data.from}
              to={data.to}
              content={data.content}
              tags={data.tags?.map((tag) => tag.name) || []}
              date={formatDate(data.createdAt)}
            />
          </section>
          <Quote className="self-end" />
        </div>

        <div className="mt-8 flex justify-end gap-4">
          {canSendEmail && (
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="secondary">
                  Send Email <Send className="ml-2 h-4 w-4" />
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Confirmation</AlertDialogTitle>
                  <AlertDialogDescription>
                    The gratitude receiver will receive an email linked to this page.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction>
                    <Button
                      disabled={sending}
                      onClick={handleSendEmail}
                    >
                      Send
                    </Button>
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          )}
          <SocialShare link={shareLink} />
        </div>

        <FooterTag className="">
          <CloseTag asChild>
          </CloseTag>
        </FooterTag>
      </ContentTag>
    </RootTag>
  )
}
