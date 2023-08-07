import { User } from "@prisma/client"
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const getUserAvatarImage = (
  user: Partial<Pick<User, "image" | "username" | "email">>
) => {
  return user.image || `https://avatar.vercel.sh/${user.email || user.username}`
}

export const formatDate = (date: Date) => {
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  })
}

export function getInitialPositionForCard(currentIndex: number) {
  const gap = 32
  const len = 320
  const left = (currentIndex % 3) * (len + gap)
  const top = Math.floor(currentIndex / 3) * (len + gap)
  return { left, top }
}
