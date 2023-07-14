"use client"

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { Info, Loader, Send, X } from "lucide-react";
import { useFieldArray, useFormContext } from "react-hook-form";
import { Button } from "../../components/ui/button";
import { Checkbox } from "../../components/ui/checkbox";
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "../../components/ui/form";
import { Input } from "../../components/ui/input";
import { Textarea } from "../../components/ui/textarea";


export default function PaneEdit({
  sending,
}: {
  sending: boolean,
}) {
  const form = useFormContext()
  const { fields, append, remove } = useFieldArray({
    name: "tags",
    control: form.control,
  })

  return (
    <div className="mx-auto max-w-[512px] space-y-4 px-4">
      <FormField
        control={form.control}
        name="to.email"
        render={({ field }) => (
          <FormItem className="">
            <FormLabel className="">
              To
            </FormLabel>
            <FormControl>
              <Input
                type="email"
                placeholder="abc@example.com"
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="to.name"
        render={({ field }) => (
          <FormItem className="">
            <FormControl>
              <Input
                placeholder="name (optional)"
                {...field}
              />
            </FormControl>
            <FormDescription></FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="content"
        render={({ field }) => {
          return (
            <FormItem className="row-span-3 h-full">
              <FormLabel>Gratitude</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Share your gratitude..."
                  className={cn(`resize-none`)}
                  maxLength={180}
                  {...field}
                />
              </FormControl>
              <FormDescription></FormDescription>
              <FormMessage />
            </FormItem>
          );
        }}
      />
      <div className="flex">
        <div className="w-1/2 space-y-2">
          {fields.map((field, index) => (
            <FormField
              control={form.control}
              key={field.id}
              name={`tags.${index}.value`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className={cn(index !== 0 && "sr-only")}>
                    Tags
                  </FormLabel>
                  <FormDescription className={cn(index !== 0 && "sr-only")}>
                    {/* Add links to your website, blog, or social media profiles. */}
                  </FormDescription>
                  <FormControl>
                    <div className="flex items-center gap-2">
                      <Input {...field} />
                      <X onClick={() => remove(index)} className="h-4 w-4 text-gray-500" />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          ))}
          {form.watch('tags') && form.watch('tags')!.length < 3 && (
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="mt-2"
              onClick={() => append({ value: "" })}
            >
              Add tag
            </Button>
          )}
          <FormField
            control={form.control}
            name="notify"
            render={({ field }) => (
              <FormItem
                className="!mt-4 flex items-center space-x-2">
                <Checkbox
                  checked={field.value}
                  onCheckedChange={(state: boolean) => field.onChange(state)}
                />
                <FormLabel className="!my-0">
                  Send email
                </FormLabel>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger type="button" className="!my-0">
                      <Info className="h-4 w-4 text-gray-500" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Receiver will be notified via email address above</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex flex-1 justify-end">
          <Button
            disabled={sending}
            type="submit"
            className="inline-flex h-[96px] w-[96px] gap-2">
            {sending
              ? <Loader className="h-4 w-4 animate-spin" />
              : <Send className="h-4 w-4" />
            }
            Send
          </Button>
        </div>
      </div>
    </div >
  )
}
