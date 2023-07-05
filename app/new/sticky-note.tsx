"use client"

import { useForm } from "react-hook-form"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Colors, FontSize, noteSchema, Typeface } from "@/lib/validations";
import { z } from "zod";
import { cn } from "@/lib/utils";
import { Icons } from "@/components/icons";
import { Textarea } from "@/components/ui/textarea";
import { Menubar, MenubarContent, MenubarMenu, MenubarRadioGroup, MenubarRadioItem, MenubarSeparator, MenubarShortcut, MenubarTrigger } from "@/components/ui/menubar";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "@/components/ui/command";
import React from "react";
import { AtSign, Check, ChevronsUpDown, Save, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Checkbox } from "@/components/ui/checkbox";

const frameworks = [
  {
    value: "next.js",
    label: "Next.js",
  },
  {
    value: "sveltekit",
    label: "SvelteKit",
  },
  {
    value: "nuxt.js",
    label: "Nuxt.js",
  },
  {
    value: "remix",
    label: "Remix",
  },
  {
    value: "astro",
    label: "Astro",
  },
]

interface FormValues extends z.infer<typeof noteSchema> { }

export function StickyNote() {
  const form = useForm<FormValues>({
    resolver: zodResolver(noteSchema),
    defaultValues: {
      bg: Colors.Blue,
      fontSize: FontSize.Regular,
      typeface: Typeface.Simple,
      tags: [],
      notify: true
    },
  })

  const currentBg = form.watch("bg");
  const customBg = currentBg.startsWith('blob:')
  const currentFontSize = form.watch("fontSize");
  const currentTypeface = form.watch("typeface");

  const [open, setOpen] = React.useState(false)
  const [value, setValue] = React.useState("")
  const ref = React.useRef<HTMLTextAreaElement>(null)

  return (
    <div className="">
      <Form {...form}>
        <div className={cn(`
          bg-${currentBg}-300 dark:bg-${currentBg}-600
          p-4 shadow-md 
          grid h-[320px] w-[320px] grid-rows-4
        `)}>
          <div className="row-span-3">
            <FormField
              control={form.control}
              name="content"
              render={({ field }) => {
                return (
                  <FormItem className="h-full">
                    <FormControl>
                      <Textarea
                        placeholder="Share your gratitude..."
                        className={cn(`h-full resize-none border-0 overflow-clip`,
                          `text-${currentFontSize}`,
                          `font-${currentTypeface}`,
                          `placeholder:text-gray-700 dark:placeholder:text-gray-200`
                        )}
                        style={{ boxShadow: "none" }}
                        // onInput={({ currentTarget }: React.FormEvent<HTMLTextAreaElement>) => {
                        //   if (currentTarget.scrollHeight > currentTarget.clientHeight) {
                        //     form.setValue("content", form.getValues("content").slice(0, -1))
                        //   }
                        // }}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
          </div>
          <div className="row-span-1">
            {/* <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  aria-expanded={open}
                  className="w-[200px] justify-between"
                >
                  {value
                    ? frameworks.find((framework) => framework.value === value)?.label
                    : "Select framework..."}
                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-[200px] p-0">
                <Command>
                  <CommandInput placeholder="Search framework..." />
                  <CommandEmpty>No framework found.</CommandEmpty>
                  <CommandGroup>
                    {frameworks.map((framework) => (
                      <CommandItem
                        key={framework.value}
                        onSelect={(currentValue) => {
                          setValue(currentValue === value ? "" : currentValue)
                          setOpen(false)
                        }}
                      >
                        <Check
                          className={cn(
                            "mr-2 h-4 w-4",
                            value === framework.value ? "opacity-100" : "opacity-0"
                          )}
                        />
                        {framework.label}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </Command>
              </PopoverContent>
            </Popover> */}

            <div className="flex flex-col gap-2 text-sm">
              <div className="flex items-center">
                <label className="">
                  <AtSign className="w-4 h-4" />
                </label>
                <input
                  placeholder="someone"
                  className="w-full px-2 bg-transparent appearance-none leading-tight focus:outline-none" id="inline-full-name"
                />
              </div>
              <div className="flex items-center">
                <label className="rotate-45">🏷️</label>
                <input
                  placeholder="tag1, tag2, tag3"
                  className="px-2 bg-transparent appearance-none leading-tight focus:outline-none" id="inline-full-name"
                />
              </div>
              <div className="" onClick={() => form.setValue('notify', !form.getValues('notify'))}>
                <FormField
                  control={form.control}
                  name="notify"
                  render={({ field }) => (
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={(state: boolean) => field.onChange(state)}
                      />
                      <label
                        htmlFor="terms"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Send email
                      </label>
                    </div>
                  )}
                />
                {/* <div className="flex items-center gap-2">
                    <Check valueChecked={form.watch('notify') === true} className="w-4 h-4" />
                    <span></span>
                  </div> */}

                {/* 
                  <FormField
                    control={form.control}
                    name="notify"
                    render={({ field }) => (
                      <div className="inline-flex">
                      </div>
                    )} */}
                {/* /> */}
              </div>
            </div >
          </div >
        </div >
        <Menubar className="mt-4 py-6 px-3">
          <MenubarMenu>
            <MenubarTrigger>
              <Icons.palette className='h-4 w-4' />
            </MenubarTrigger>
            <MenubarContent>
              <FormField
                control={form.control}
                name="bg"
                render={({ field }) => (
                  <>
                    <MenubarRadioGroup
                      // @ts-ignore
                      onValueChange={(value: Colors) => field.onChange(value)}
                      value={field.value}
                    >
                      {Object.entries(Colors).map(([colorDisplay, colorValue]) => {
                        return (
                          <MenubarRadioItem key={colorValue} value={colorValue} className={`text-${colorValue}-500`}>
                            {colorDisplay}
                          </MenubarRadioItem>
                        );
                      })}
                    </MenubarRadioGroup>
                  </>
                )}
              />
            </MenubarContent>
          </MenubarMenu>
          <MenubarMenu>
            <MenubarTrigger>
              <Icons.type className="h-4 w-4" />
            </MenubarTrigger>
            <MenubarContent>
              <FormField
                control={form.control}
                name="typeface"
                render={({ field }) => (
                  <MenubarRadioGroup
                    // @ts-ignore
                    onValueChange={(value: Typeface) => field.onChange(value)}
                    value={field.value}
                  >
                    {Object.entries(Typeface).map(([typefaceDisplay, typefaceValue]) => {
                      return (
                        <MenubarRadioItem className={`font-${typefaceValue}`} key={typefaceValue} value={typefaceValue}>
                          {typefaceDisplay}
                        </MenubarRadioItem>
                      );
                    })}
                  </MenubarRadioGroup>
                )}
              />
            </MenubarContent>
          </MenubarMenu>
          <MenubarMenu>
            <MenubarTrigger>
              <Icons.baseline className='h-4 w-4' />
            </MenubarTrigger>
            <MenubarContent>
              <FormField
                control={form.control}
                name="fontSize"
                render={({ field }) => (
                  <MenubarRadioGroup
                    // @ts-ignore
                    onValueChange={(value: FontSize) => field.onChange(value)}
                    value={field.value}
                  >
                    {Object.entries(FontSize).map(([fontDisplay, fontValue]) => {
                      return (
                        <MenubarRadioItem className={`text-${fontValue}`} key={fontValue} value={fontValue}>
                          {fontDisplay}
                        </MenubarRadioItem>
                      );
                    })}
                  </MenubarRadioGroup>
                )}
              />
            </MenubarContent>
          </MenubarMenu>
          <div className="cursor-pointer px-3 py-2" onClick={() => form.setValue('content', '')}>
            <Icons.clear className="h-4 w-4" />
          </div>
          <div className="flex gap-2 flex-1 justify-end">
            <Button variant="secondary" size="sm">
              <Save className="h-4 w-4" />
            </Button>
            <Button variant="default" size="sm">
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </Menubar>
      </Form >
    </div >
  )
}
