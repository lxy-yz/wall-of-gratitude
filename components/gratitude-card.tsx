"use client"

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { AvatarImage } from "@radix-ui/react-avatar";
import { User } from "lucide-react";
import Link from "next/link";

export function GratitudeCard({
  color,
  typeface,
  fontSize,
  from = 'Anonymous',
  to,
  content,
  tags
}: {
  color: string,
  typeface: string,
  fontSize: string,
  from: string,
  to: string,
  content: string,
  tags: string[]
}) {
  return (
    <Card className={cn(
      'h-[320px] w-[320px]',
      `bg-${color}-300 dark:bg-${color}-600`,
      `font-${typeface} text-${fontSize}`
    )}>
      <CardHeader>
        <div className="flex items-center justify-end gap-2">
          <Avatar className="order-2">
            <AvatarImage src="/avatars/01.png" />
            <AvatarFallback>
              <User />
            </AvatarFallback>
          </Avatar>
          <div className="order-1">
            <p className="text-sm text-muted-foreground">{to}</p>
          </div>
        </div>
      </CardHeader>
      <CardContent className="grid gap-6">
        {content}
        <div className="space-y-1 text-sm text-muted-foreground dark:text-muted">
          <div className="space-x-2">
            {tags.map(tag => (
              <Badge key={tag} variant="outline" className="border-none p-0 text-muted-foreground dark:text-muted">#{tag}</Badge>
            ))}
          </div>
          <div>
            {new Date().toLocaleDateString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' })}
          </div>
          <div className="">
            -
            <Link href="" className="font-bold underline">{from}</Link>
          </div>
        </div>
      </CardContent>
      <CardFooter>
      </CardFooter>
    </Card>
  )
}
