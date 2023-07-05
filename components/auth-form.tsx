"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Icon } from '@iconify/react';

import { Button, buttonVariants } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useForm } from "react-hook-form"
import { authSchema } from "@/lib/validations"
import { signIn } from "next-auth/react"
import { redirect, useSearchParams } from "next/navigation"

import { AlertCircle } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Separator } from "./ui/separator"
import { cn } from "@/lib/utils"
import { toast } from "./ui/use-toast";

// import { getCsrfToken } from "next-auth/react"

export function AuthForm({ login }: { login?: boolean }) {
  const searchParams = useSearchParams();
  const error = searchParams.get("error");

  const form = useForm<z.infer<typeof authSchema>>({
    resolver: zodResolver(authSchema),
    defaultValues: {

    },
  })

  async function onSubmit(values: z.infer<typeof authSchema>) {
    if (!login) {
      const res = await fetch("/api/register", {
        method: "POST",
        body: JSON.stringify(values),
      })
      if (!res.ok) {
        const error = await res.text()
        console.error(error)
        return toast({ title: 'error', description: error })
      }
    }

    signIn("credentials", {
      email: values.email,
      password: values.password,
      callbackUrl: searchParams.get("from") ?? "/",
    })
    toast({ title: 'success', description: '', })
  }

  return (
    <div className="">
      <button
        type="button"
        className={cn(buttonVariants({ variant: "outline" }), 'w-full flex items-center justify-center gap-2')}
        onClick={() => {
          signIn("google")
        }}
      // disabled={}
      >
        <Icon icon="devicon:google" className="h-4 w-4" />
        Sign In with Google
      </button>
      <Separator className="my-4" />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
          {!login && (
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input placeholder="username" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="abc@example.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" {...field} />
                </FormControl>
                <FormDescription>
                  This is your public display name.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          {!login && (
            <Button type="submit">Sign Up →</Button>
          )}
          {login && (
            <Button type="submit">Sign In →</Button>
          )}
        </form>
        {error && (
          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
      </Form>
    </div>
  )
}
