"use client"

import { getUserAvatarImage } from "@/lib/utils";
import { profileSchema } from "@/lib/validations";
import { zodResolver } from "@hookform/resolvers/zod";
import { HomeIcon, Instagram, Loader, TwitterIcon } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "./ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "./ui/form";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { toast } from "./ui/use-toast";

type FormValues = z.infer<typeof profileSchema>

export default function ProfileForm({
  data
}: {
  data: FormValues
}) {
  const form = useForm<FormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      urls: data.urls || [
        // https://github.com/orgs/react-hook-form/discussions/7586
        { value: "" },
        { value: "" },
        { value: "" },
      ],
      email: data.email,
      username: data.username,
      name: data.name,
      bio: data.bio,
    },
  })

  const [isSaving, setIsSaving] = useState(false)
  const [previewImage, setPreviewImage] = useState(data?.image)

  async function onSubmit(values: FormValues) {
    const {
      name,
      username,
      email,
      bio,
      urls,
    } = values;
    setIsSaving(true)

    const res = await fetch('/api/profile', {
      method: 'POST',
      body: JSON.stringify({
        name,
        username,
        email,
        bio,
        urls,
        // input file is imuumable, so use a custom input rather than RHF
        // https://github.com/orgs/react-hook-form/discussions/2496
        image: data?.image === previewImage
          ? undefined
          : previewImage || await getUserAvatarImage(data),
      })
    })
    setIsSaving(false)

    if (!res.ok) {
      return toast({
        title: '❌ Something went wrong.'
      })
    }

    toast({
      title: "✅ Profile updated.",
      // description: (
      //   <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
      //     <code className="text-white">{JSON.stringify(data, null, 2)}</code>
      //   </pre>
      // ),
    })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="image"
          render={() => (
            <FormItem>
              <FormLabel>Avatar</FormLabel>
              <div
                style={{
                  backgroundImage: previewImage
                    ? `url("${previewImage}")`
                    : `url("${getUserAvatarImage(data)}")`
                }}
                className="relative mx-auto h-24 w-24 rounded-full bg-cover bg-center md:h-[200px] md:w-[200px]"
              >
                <Input
                  type="file"
                  className="absolute left-0 top-0 h-full w-full cursor-pointer opacity-0"
                  onChange={async (event: React.ChangeEvent<HTMLInputElement>) => {
                    if (!event.currentTarget.files || event.currentTarget.files.length === 0) {
                      return
                    }
                    const image = event.currentTarget.files[0] as File;
                    setPreviewImage(await fileToBase64(image))
                  }}
                />
              </div>
              <FormDescription className="text-center">
                Click above to change.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="" {...field} />
              </FormControl>
              <FormDescription></FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="" {...field} />
              </FormControl>
              <FormDescription></FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" disabled placeholder="" {...field} />
              </FormControl>
              <FormDescription>
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="bio"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Bio</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Tell us a little bit about yourself"
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormDescription>
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="space-y-2">
          <FormField
            control={form.control}
            name={`urls.0.value`}
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  URLs
                </FormLabel>
                <FormDescription>
                  Add links to your website, blog, or social media profiles.
                </FormDescription>
                <div className="flex items-center gap-4">
                  <HomeIcon className="h-6 w-6" />
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name={`urls.1.value`}
            render={({ field }) => (
              <FormItem className="flex items-center gap-4">
                <TwitterIcon className="h-6 w-6" />
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name={`urls.2.value`}
            render={({ field }) => (
              <FormItem className="flex items-center gap-4">
                <Instagram className="h-6 w-6" />
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="!mt-6 flex justify-end">
          <Button className="flex items-center gap-2" type="submit">
            Update profile
            {isSaving && <Loader className="h-4 w-4 animate-spin" />}
          </Button>
        </div>
      </form>
    </Form >
  )

  // const [previewImage, setPreviewImage] = useState(data?.image)
  // const [isSaving, setIsSaving] = useState(false)
  // const [toast, setToast] = useState('')

  // return (
  //   <form
  //     onSubmit={handleSubmit(async ({ username, bio, websites, image }) => {
  //       setIsSaving(true)
  //       const res = await fetch('/api/profile', {
  //         method: 'POST',
  //         body: JSON.stringify({
  //           username,
  //           bio,
  //           websites,
  //           image: image && await fileToBase64(image[0] as File)
  //         })
  //       })
  //       setIsSaving(false)

  //       if (!res.ok) {
  //         return setToast('Something went wrong.')
  //       }
  //       setToast('Profile updated.')
  //     })}
  //     className="flex flex-col md:flex-row md:gap-4"
  //   >
  //     <div className="md:order-1">
  //       <label htmlFor="image" className="block text-sm font-medium text-gray-700">Avatar</label>
  //       <div
  //         style={{ backgroundImage: `url("${previewImage}")` }}
  //         className="bg-cover bg-center mt-4 mx-auto bg-gray-900 rounded-full relative w-24 h-24 md:w-[200px] md:h-[200px]">
  //         <input
  //           {...register('image', {
  //             required: false,
  //             onChange: (event: React.ChangeEvent<HTMLInputElement>) => {
  //               if (!event.target.files || event.target.files.length === 0) {
  //                 return
  //               }
  //               const image = event.target.files[0] as File;
  //               setPreviewImage(URL.createObjectURL(image))
  //             }
  //           })}
  //           type="file"
  //           className="cursor-pointer absolute left-0 top-0 opacity-0 w-full h-full"
  //         />
  //       </div>
  //     </div>
  //     <div className="flex-1 flex flex-col gap-4">
  //       <div className="flex flex-col gap-2">
  //         <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username</label>
  //         <input
  //           id="username"
  //           className="input input-bordered w-full"
  //           {...register("username", { required: true })}
  //           onBlur={async () => {
  //             const username = getValues('username')
  //             const res = await fetch(`/api/profile/checkUsername`, {
  //               method: 'POST',
  //               body: JSON.stringify({ username })
  //             })
  //             if (!res.ok && res.status === 422) {
  //               return setError('username', {
  //                 type: 'manual',
  //                 message: 'username already exists.'
  //               })
  //             }
  //             clearErrors('username')
  //           }}
  //         />
  //         {errors.username?.type === 'manual' && (
  //           <span className="self-end text-sm text-error">{errors.username.message}</span>
  //         )}
  //       </div>
  //       <div className="flex flex-col gap-2">
  //         <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
  //         <input
  //           type="email"
  //           id="email"
  //           disabled
  //           className="input input-bordered w-full"
  //           {...register("email", { required: true })}
  //         />
  //       </div>
  //       <div className="flex flex-col gap-2">
  //         <label htmlFor="bio" className="block text-sm font-medium text-gray-700">Bio</label>
  //         <textarea
  //           id="bio"
  //           placeholder="Tell us a bit about yourself"
  //           rows={3}
  //           className="textarea textarea-bordered w-full"
  //           {...register("bio", { required: false })}
  //         ></textarea>
  //       </div>
  //       <div className="flex flex-col gap-2">
  //         <label htmlFor="websites" className="block text-sm font-medium text-gray-700">Website links</label>
  //         <input
  //           type="url"
  //           placeholder="e.g. https://yourawesome.website"
  //           className="input input-bordered w-full"
  //           {...register("websites.0", {
  //             required: false,
  //             pattern: /^https?:\/\//
  //           })}
  //         />
  //         <input
  //           type="url"
  //           placeholder="e.g. https://twitter.com/username"
  //           className="input input-bordered w-full"
  //           {...register("websites.1", {
  //             required: false,
  //             pattern: /^https?:\/\/(www\.)?twitter\.com\/(#!\/)?[a-zA-Z0-9_]+$/i
  //           })}
  //         />
  //         <input
  //           type="url"
  //           placeholder="e.g. https://linkedin.com/in/username"
  //           className="input input-bordered w-full"
  //           {...register("websites.2", {
  //             required: false,
  //             pattern: /^https?:\/\/(www\.)?linkedin\.com\/(#!\/)?[a-zA-Z0-9_]+$/i
  //           })}
  //         />
  //       </div>
  //       <div>
  //         <button disabled={isSaving} type="submit" className="capitalize btn btn-primary">Save</button>
  //       </div>
  //     </div>
  //     {
  //       toast && (
  //         <div className="toast">
  //           <div className="alert alert-info">
  //             <span>{toast}</span>
  //           </div>
  //         </div>
  //       )
  //     }
  //   </form >
  // )
}

function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}