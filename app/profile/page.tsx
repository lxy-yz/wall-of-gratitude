// import { useRedirectIfNotLoggedIn } from '@/lib/auth'
import { db } from '@/lib/db';
import ProfileForm from "@/components/profile-form";
import { getCurrentUser } from '@/lib/auth';

export default async function ProfilePage() {
  const user = await getCurrentUser()
  const data = await db.user.findFirst({
    where: {
      email: user?.email
    },
    select: {
      name: true,
      username: true,
      bio: true,
      email: true,
      image: true,
      urls: true,
    }
  });

  return (
    <div className="pt-20">
      <h1 className="text-center text-3xl font-semibold">
        Edit Profile
      </h1>
      <div className="mx-auto mt-10 max-w-xl">
        <ProfileForm data={{
          ...data,
          urls: data?.urls?.map((url) => ({ value: url }))
        }} />
      </div>
    </div>
  )
}