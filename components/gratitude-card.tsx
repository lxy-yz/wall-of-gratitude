"use client"

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { cn, getUserAvatarImage, today } from "@/lib/utils";
import { AvatarImage } from "@radix-ui/react-avatar";
import { User } from "lucide-react";
import Link from "next/link";

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
  from: { email: string, name?: string, username?: string },
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
            {/* TODO: https://ui.shadcn.com/docs/components/hover-card */}
            <Link href="" className="font-bold italic underline">{from.name || '@' + (from.username || from.email)}</Link>
          </div>
        </div>
      </CardContent>
      <CardFooter>
      </CardFooter>
    </Card>
  )
}
