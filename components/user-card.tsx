import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";

export const UserCard = ({ data }: {
  data: {
    name?: string,
    username?: string,
    email?: string,
    image?: string,
    bio?: string,
  }
}) => {
  return (
    <div className="flex space-x-4">
      <Avatar>
        <AvatarImage src={data.image} />
        <AvatarFallback>{ }</AvatarFallback>
      </Avatar>
      <div className="space-y-1">
        <h4 className="text-sm font-semibold">
          {
            `@${data.username}`
          }
        </h4>
        <p className="text-sm">
          {data.bio || (
            <span className="text-muted-foreground">
              no bio yet
            </span>
          )}
        </p>
        <div className="flex items-center pt-2">
          <Button type="button" variant="secondary">
            <Link href={`/u/${data.username}`}>
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
  )
}