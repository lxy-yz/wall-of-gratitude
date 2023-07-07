import { getCurrentUser } from "@/lib/auth"
import cloudinary from "@/lib/cloudinary"
import { db } from "@/lib/db"
import { profileSchema } from "@/lib/validations"

// FormData didn't work for me, so I used a JSON body instead
// https://github.com/vercel/next.js/discussions/48164
export async function POST(req: Request) {
  try {
    const user = await getCurrentUser()
    if (!user) {
      return new Response("Unauthorized", { status: 403 })
    }

    const body = await req.json()
    const { name, bio, image, urls } = profileSchema.parse(body)

    let uploadedImage
    if (image) {
      const { secure_url } = await cloudinary.uploader.upload(image)
      uploadedImage = secure_url
    }

    const result = await db.user.update({
      where: {
        email: user.email,
      },
      data: {
        name,
        bio,
        urls: urls?.map((url) => url.value),
        image: uploadedImage,
      },
    })
    return new Response(JSON.stringify({ data: result }))
  } catch (error) {
    console.error(error)
    return new Response("Server upload error", { status: 500 })
  }
}

// async function base64Encode(blob: Blob): Promise<string> {
//   const buffer = Buffer.from(await blob.text());
//   return 'data:' + blob.type + ';base64,' + buffer.toString('base64');
// }
