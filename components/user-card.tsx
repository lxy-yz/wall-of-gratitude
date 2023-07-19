import { cn } from "@/lib/utils";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { buttonVariants } from "./ui/button";

export const UserCard = ({
  data
}: {
  data: {
    name?: string,
    username?: string,
    email?: string,
    image?: string,
    bio?: string,
  }
}) => {
  return (
    <div className={cn("grid grid-cols-2 items-center gap-4 font-sans")}>
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
        </div>
      </div>
      <div className={cn("flex items-center justify-end")}>
        <Link className={cn(buttonVariants({ variant: 'secondary' }))} href={`/u/${data.username}`}>
          Visit
        </Link>
      </div>
    </div>
  )
}