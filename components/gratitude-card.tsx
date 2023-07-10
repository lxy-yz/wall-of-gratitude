"use client"

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { cn, getUserAvatarImage, today } from "@/lib/utils";
import { AvatarImage } from "@radix-ui/react-avatar";
import { User } from "lucide-react";
import Link from "next/link";
import { Button } from "./ui/button";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "./ui/hover-card";

export function GratitudeCard({
  color = 'blue',
  typeface = 'sans',
  fontSize = 'base',
  content,
  from,
  to,
  tags
}: {
  color: string,
  typeface: string,
  fontSize: string,
  from: { email: string, name?: string, username?: string, image?: string, bio?: string },
  to: { email: string, name?: string, image?: string },
  content: string,
  tags: string[]
}) {
  return (
    <Card className={cn(
      'h-[320px] w-[320px] text-gray-700 dark:text-gray-300',
      `bg-${color}-300 dark:bg-${color}-700`,
      `font-${typeface} text-${fontSize}`
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
                <div className="flex space-x-4">
                  <Avatar>
                    <AvatarImage src={from.image} />
                    <AvatarFallback>{ }</AvatarFallback>
                  </Avatar>
                  <div className="space-y-1">
                    <h4 className="text-sm font-semibold">{
                      `@${from.username}`
                    }</h4>
                    <p className="text-sm">
                      {from.bio || (
                        <span className="text-muted-foreground">
                          no bio yet
                        </span>
                      )}
                    </p>
                    <div className="flex items-center pt-2">
                      <Button type="button" variant="secondary">
                        <Link href={`/u/${from.username}`}>
                          Visit
                        </Link>
                      </Button>
                      {/* <CalendarDays className="mr-2 h-4 w-4 opacity-70" />{" "}
              <span className="text-xs text-muted-foreground">
                Joined December 2021
              </span> */}
                    </div>
                  </div>
                </div>
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
