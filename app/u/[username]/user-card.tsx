
'use client'

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Icon } from "@iconify/react"
import { User } from "@prisma/client"

export function UserCard({ profile }: { profile: User }) {
  return (
    <div className="mx-auto w-[320px]">
      <Card className="border-0 bg-transparent text-center text-white backdrop-blur-2xl">
        <CardHeader>
          <CardTitle>
            <div className="flex flex-col items-center space-y-2">
              <Avatar className="h-40 w-40">
                <AvatarImage className="object-cover" src={profile.image as string} />
                <AvatarFallback>{ }</AvatarFallback>
              </Avatar>
              <p className="text-3xl capitalize">
                {profile.name}{' '}
              </p>
              <div className="space-x-2 text-base font-normal text-white/80">
                <span className="">@{profile.username}</span>
              </div>
              <div className="flex space-x-3">
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
        <CardContent className="text-white/80">
          {profile.bio}
        </CardContent>
      </Card>
    </div>
  )
}