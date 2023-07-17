import { cn } from "@/lib/utils";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { buttonVariants } from "./ui/button";

export const UserCard = ({
  hover = false,
  data
}: {
  hover?: boolean,
  data: {
    name?: string,
    username?: string,
    email?: string,
    image?: string,
    bio?: string,
  }
}) => {
  return (
    <div className={cn(
      "grid items-center gap-4 font-sans",
      !hover && "grid-cols-2"
    )}>
      <div className="flex space-x-4">
        <Avatar>
          <AvatarImage className="object-cover" src={data.image} />
          <AvatarFallback>{ }</AvatarFallback>
        </Avatar>
        <div className="flex flex-col justify-center gap-1">
          <h4 className="text-sm font-semibold">
            {`@${data.username}`}
          </h4>
          {data.name && (
            <p className="text-sm">
              {data.name}
            </p>
          )}
          {/*
            <CalendarDays className="mr-2 h-4 w-4 opacity-70" />{" "}
              <span className="text-xs text-muted-foreground">
                Joined December 2021
              </span>
            */}
        </div>
      </div>

      <div className={cn("flex pt-2",
        !hover && "items-center justify-end",
      )}>
        <Link className={cn(buttonVariants({ variant: 'secondary' }), `text-center ${hover ? 'w-full' : ''}`)} href={`/u/${data.username}`}>
          Visit
        </Link>
      </div>
    </div>
  )
}