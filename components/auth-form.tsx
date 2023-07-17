"use client"

import { Icon } from '@iconify/react';
import * as z from "zod";

import { Button, buttonVariants } from "@/components/ui/button";
import {
  Form,
  FormControl, FormField,
  FormItem, FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { authSchema } from "@/lib/validations";
import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { cn } from "@/lib/utils";
import { AlertCircle } from "lucide-react";

type FormValues = Pick<z.infer<typeof authSchema>, 'email'>;

export function AuthForm({ login }: { login?: boolean }) {
  const searchParams = useSearchParams();
  const error = searchParams.get("error");

  const form = useForm<FormValues>({
    // resolver: zodResolver(authSchema),
    defaultValues: {
      email: "",
      // password: "",
    },
  })

  async function onSubmit(values: FormValues) {
    // if (!login) {
    //   const res = await fetch("/api/register", {
    //     method: "POST",
    //     body: JSON.stringify(values),
    //   })
    //   if (!res.ok) {
    //     const error = await res.text()
    //     console.error(error)
    //     return toast({ title: 'error', description: error })
    //   }
    // }

    signIn("email", {
      email: values.email,
      // redirect: false,
      // password: values.password,
      callbackUrl: searchParams.get("from") ?? "/",
    })
  }

  return (
    <div className="">
      <button
        type="button"
        className={cn(buttonVariants({ variant: "outline" }), 'w-full flex items-center justify-center gap-2')}
        onClick={() => {
          signIn("google")
        }}
      >
        <Icon icon="devicon:google" className="h-4 w-4" />
        Sign In with Google
      </button>
      <div className="relative my-4">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
          {/* {!login && (
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )} */}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                {/* <FormLabel>Email</FormLabel> */}
                <FormControl>
                  <Input placeholder="abc@example.com" type="email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          /> */}
          <div className="">
            {/* {!login && (
              <Button type="submit">Sign Up →</Button>
            )} */}
            {/* {login && ( */}
            <Button className="w-full" type="submit">Sign In with Email</Button>
            {/* )} */}
          </div>
        </form>
        {error && (
          <Alert variant="destructive" className="mt-4">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
      </Form>
    </div>
  )
}
