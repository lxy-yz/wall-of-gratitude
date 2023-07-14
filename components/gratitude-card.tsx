"use client"

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { cn, today } from "@/lib/utils";
import { AvatarImage } from "@radix-ui/react-avatar";
import { User } from "lucide-react";
import { Button } from "./ui/button";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "./ui/hover-card";
import { UserCard } from "./user-card";

export function GratitudeCard({
  className,
  color = 'blue',
  typeface = 'sans',
  fontSize = 'base',
  content,
  from,
  to,
  tags
}: {
  className?: string,
  color?: string | null,
  typeface?: string | null,
  fontSize?: string | null,
  from: { email: string, name?: string, username?: string, image?: string, bio?: string },
  to: { email: string, name?: string, image?: string, username?: string },
  content: string,
  tags: string[]
}) {
  return (
    <Card className={cn(
      'h-[320px] w-[320px] border-none text-gray-700 dark:text-gray-300',
      `bg-${color}-300 dark:bg-${color}-700`,
      `font-${typeface} text-${fontSize}`,
      className
    )}>
      <CardHeader>
        <div className="flex items-center justify-end gap-2">
          <Avatar className="order-2">
            <AvatarImage src={to.image} />
            <AvatarFallback>
              <User />
            </AvatarFallback>
          </Avatar>
          <div className="order-1 text-right">
            <p className="text-sm">{to.email}</p>
            <p className="text-sm">{to.name}</p>
          </div>
        </div>
      </CardHeader>
      <CardContent className="grid gap-6">
        <p className="font-semibold text-black dark:text-white">
          {content}
        </p>
        <div className="space-y-1 text-sm">
          <div className="space-x-2">
            {tags.map(tag => (
              <Badge key={tag} variant="outline" className="border-none p-0 text-muted-foreground dark:text-muted">#{tag}</Badge>
            ))}
          </div>
          <div>
            {today}
          </div>
          <div className="">
            -{' '}
            <HoverCard>
              <HoverCardTrigger asChild>
                <Button type="button" variant="link" className="p-0 font-semibold italic underline">
                  {from.name || '@' + (from.username || from.email)}
                </Button>
              </HoverCardTrigger>
              <HoverCardContent className="w-80">
                <UserCard
                  hover
                  data={{
                    name: from.name,
                    username: from.username,
                    image: from.image,
                    bio: from.bio,
                    email: from.email
                  }}
                />
              </HoverCardContent>
            </HoverCard>
          </div>
        </div>
      </CardContent>
      <CardFooter>
      </CardFooter>
    </Card>
  )
}
