
'use client'

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardHeader, CardTitle } from "@/components/ui/card"
import { Icon } from "@iconify/react"
import { User } from "@prisma/client"

export function UserCard({ profile }: { profile: User }) {
  return (
    <div className="mx-auto w-[320px]">
      <Card className="border-0 bg-transparent text-center text-slate-800 backdrop-blur-2xl">
        <CardHeader>
          <CardTitle>
            <div className="flex flex-col items-center space-y-2">
              <Avatar className="h-28 w-28">
                <AvatarImage className="object-cover" src={profile.image as string} />
                <AvatarFallback>{ }</AvatarFallback>
              </Avatar>
              <p className="text-3xl font-normal capitalize">
                {profile.name}{' '}
                <span className="block text-base font-normal lowercase">@{profile.username}</span>
              </p>
              <div className="text-base font-normal text-slate-600">
                {profile.bio}
              </div>
              <div className="!mt-4 flex space-x-3">
                {profile.urls[0] && (
                  <a target="_blank" href={profile.urls[0]} rel="noreferrer">
                    <Icon icon="line-md:home" />
                  </a>
                )}
                {profile.urls[1] && (
                  <a target="_blank" href={profile.urls[1]} rel="noreferrer">
                    <Icon icon="line-md:twitter" />
                  </a>
                )}
                {profile.urls[2] && (
                  <a target="_blank" href={profile.urls[2]} rel="noreferrer">
                    <Icon icon="line-md:instagram" />
                  </a>
                )}
                <a href={`mailto:${profile.email}`}>
                  <Icon icon="line-md:email" />
                </a>
              </div>
            </div>
          </CardTitle>
        </CardHeader>
      </Card>
    </div>
  )
}