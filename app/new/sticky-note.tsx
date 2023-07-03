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
import { Check, ChevronsUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";

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
          bg-${currentBg}-300 bg-cover bg-center 
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
                          `font-${currentTypeface}`)
                        }
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

            <div className="flex justify-between text-sm">
              <div className="">
                <div className="">
                  <div className="before:content-['@'] before:text-slate-700 before:mr-1 text-slate-500" contentEditable>person</div>
                </div>
                <div className="mt-2">
                  <div className="before:content-['#'] before:text-slate-700 before:mr-1 text-slate-500" contentEditable>tag</div>
                </div>
              </div>
              <div className="text-gray-700">
                <div className="">
                  <FormField
                    control={form.control}
                    name="notify"
                    render={({ field }) => (
                      <div className="inline-flex">
                        <Switch
                          className="mr-2"
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                        notify
                      </div>
                    )}
                  />
                </div>
                <div className="mt-2 text-right">
                  {new Date().toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: 'numeric' })}
                </div>
              </div>
            </div >
          </div >
        </div >
        <Menubar className="mt-4 py-6">
          <MenubarMenu>
            <MenubarTrigger>
              <Icons.palette className={`h-4 w-4`} />
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
              <Icons.type className={`h-4 w-4`} />
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
              <Icons.baseline className={`h-4 w-4`} />
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
          {/* <Separator orientation="vertical" /> */}
          <div className="flex gap-2">
            <Button variant="secondary" size="sm">Save</Button>
            <Button variant="default" size="sm">Post</Button>
          </div>
        </Menubar>
      </Form >
    </div >
  )
}
