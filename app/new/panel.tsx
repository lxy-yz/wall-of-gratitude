"use client"

import { FormProvider, useForm } from "react-hook-form"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Colors, FontSize, gratitudeSchema, Typeface } from "@/lib/validations";
import { z } from "zod";
import { cn } from "@/lib/utils";
import { Icons } from "@/components/icons";
import { Textarea } from "@/components/ui/textarea";
import { Menubar, MenubarContent, MenubarMenu, MenubarRadioGroup, MenubarRadioItem, MenubarSeparator, MenubarShortcut, MenubarTrigger } from "@/components/ui/menubar";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "@/components/ui/command";
import React, { useState } from "react";
import { AtSign, Check, ChevronsUpDown, Save, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Checkbox } from "@/components/ui/checkbox";
import GratitudeForm, { GratitudeFormValues } from "@/components/gratitude-form";
import { Preview, UISetting } from "./preview";

export function Panel() {
  const [uiSettings, setUiSettings] = useState<UISetting>()

  return (
    <div className="flex flex-col md:flex-row">
      <div className="order-3 flex-1 md:order-1">
        <GratitudeForm />
      </div>
      <div className="order-2 m-4 block md:hidden">
        <Separator orientation="horizontal" />
      </div>
      <div className="order-2 mx-4 md:mx-8 hidden md:block">
        <Separator orientation="vertical" />
      </div>
      <div className="order-1 md:order-3">
        <Preview setting={uiSettings} />
      </div>
    </div>
  )
}
