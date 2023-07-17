"use client"

import PaneEdit from "@/app/send-gratitude/pane-edit";
import { Separator } from "@/components/ui/separator";
import { toast } from "@/components/ui/use-toast";
import { Colors, FontSize, gratitudeSchema, Typeface } from "@/lib/validations";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";
import { PanePreview } from "./pane-preview";

export type GratitudeFormValues = z.infer<typeof gratitudeSchema>

export function GratitudeForm() {
  const searchParams = useSearchParams();
  const form = useForm<GratitudeFormValues>({
    resolver: zodResolver(gratitudeSchema),
    defaultValues: {
      to: {
        email: searchParams.get("to.email") ?? '',
        name: searchParams.get("to.name") ?? '',
      },
      bg: Colors.Blue,
      fontSize: FontSize.Regular,
      typeface: Typeface.Simple,
      notify: true,
      tags: [],
    },
  })

  const router = useRouter()
  const [sending, setSending] = useState(false)
  async function onSubmit(data: GratitudeFormValues) {
    setSending(true)
    const res = await fetch("/api/gratitude", {
      method: "POST",
      body: JSON.stringify({
        ...data,
      }),
    })
    setSending(false)

    if (!res.ok) {
      const error = await res.text()
      console.error(error)
      return toast({ title: 'error', description: error })
    }

    const json = await res.json()
    if (data.notify) {
      fetch("/api/email/send", {
        method: "POST",
        body: JSON.stringify({
          gratitudeId: json.id
        }),
      }).catch((err) => {
        console.error(err)
      })
    }

    router.push(`/gratitudes/${json.data.id}`)
  }

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="flex flex-col md:flex-row">
          <div className="order-3 flex-1 md:order-1">
            <PaneEdit sending={sending} />
          </div>
          <div className="order-2 m-4 block md:hidden">
            <Separator orientation="horizontal" />
          </div>
          <div className="order-2 mx-4 hidden md:mx-8 md:block">
            <Separator orientation="vertical" />
          </div>
          <div className="order-1 md:order-3 md:w-1/2">
            <PanePreview />
          </div>
        </div>
      </form>
    </FormProvider>
  )
}