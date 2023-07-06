"use client"

import { useFieldArray, useFormContext } from "react-hook-form";
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "../../components/ui/form";
import { Input } from "../../components/ui/input";
import { Textarea } from "../../components/ui/textarea";
import { Button } from "../../components/ui/button";
import { cn } from "@/lib/utils";
import { Info, Send, X } from "lucide-react";
import { Checkbox } from "../../components/ui/checkbox";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";


export default function PaneEdit({ data }: {
  data?: FormData | null
}) {
  const form = useFormContext()
  const { fields, append, remove } = useFieldArray({
    name: "tags",
    control: form.control,
  })

  return (
    <div className="max-w-[512px] px-4 space-y-4">
      {/* <div className="grid grid-cols-3 gap-4">
        <FormField
          control={form.control}
          name="typeface"
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel>Font</FormLabel>
                <FormControl>
                  <Select onValueChange={(value: Typeface) => field.onChange(value)} defaultValue={field.value}>
                    <SelectTrigger>
                      <SelectValue placeholder="Choose font" />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.entries(Typeface).map(([key, value]) => (
                        <SelectItem
                          className={`font-${value}`}
                          key={key}
                          value={value}
                        >
                          {key}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormDescription></FormDescription>
                <FormMessage />
              </FormItem>
            );
          }}
        />
        <FormField
          control={form.control}
          name="fontSize"
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel>Size</FormLabel>
                <FormControl>
                  <Select onValueChange={(value: FontSize) => field.onChange(value)} defaultValue={field.value}>
                    <SelectTrigger>
                      <SelectValue placeholder="Choose size" />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.entries(FontSize).map(([key, value]) => (
                        <SelectItem
                          className={`text-${value}`}
                          key={key} value={value}>{key}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormDescription></FormDescription>
                <FormMessage />
              </FormItem>
            );
          }}
        />
        <FormField
          control={form.control}
          name="bg"
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel>Background</FormLabel>
                <FormControl>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <SelectTrigger>
                      <SelectValue placeholder="Choose background" />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.entries(Colors).map(([key, value]) => (
                        <SelectItem
                          className={`text-${value}-500`}
                          key={key} value={value}>{key}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormDescription></FormDescription>
                <FormMessage />
              </FormItem>
            );
          }}
        />
      </div> */}
      <FormField
        control={form.control}
        name="to"
        render={({ field }) => (
          <FormItem className="">
            <FormLabel className="">
              To
            </FormLabel>
            <FormControl>
              <Input
                type="email"
                placeholder="alice@example.com"
                {...field}
              />
            </FormControl>
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
                className="!mt-4 flex w-1/2 items-center space-x-2">
                <Checkbox
                  checked={field.value}
                  onCheckedChange={(state: boolean) => field.onChange(state)}
                />
                <FormLabel className="!my-0">
                  Send email
                </FormLabel>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger className="!my-0">
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
          <Button className="inline-flex h-[96px] w-[96px] gap-2" type="submit">
            <Send className="h-4 w-4" />
            Send
          </Button>
        </div>
      </div>
    </div>
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

function fileToBase64(file: File) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}