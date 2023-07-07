// import { useRedirectIfNotLoggedIn } from '@/lib/auth'
import { db } from '@/lib/db';
import ProfileForm from "@/components/profile-form";

export default async function ProfilePage() {
    //   const session = await useRedirectIfNotLoggedIn()

    // const profile = await db.user.findFirst({
    //     where: {
    //         email: session.user.email
    //     },
    // });

    return (
        <div className="pt-20">
            <h1 className="text-center text-3xl font-semibold">
                Edit Profile
            </h1>
            <div className="mt-10 mx-auto max-w-xl">
                <ProfileForm data={{}} />
            </div>
        </div>
    )
}