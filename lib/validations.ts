import { z } from "zod"

export const authSchema = z.object({
  username: z
    .string()
    .min(2, {
      message: "Username must be at least 2 characters.",
    })
    .max(30, {
      message: "Username must not be longer than 30 characters.",
    })
    .optional(),
  email: z.string().email("Email must valid email."),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters long.",
  }),
})

export enum Colors {
  Red = "red",
  Green = "green",
  Blue = "blue",
  Yellow = "yellow",
  Purple = "purple",
  Pink = "pink",
  Indigo = "indigo",
  Orange = "orange",
  Gray = "gray",
}

export enum Typeface {
  Simple = "sans",
  Bookish = "serif",
  Technical = "mono",
  Scribbled = "cursive",
}

export enum FontSize {
  Small = "sm",
  Regular = "base",
  Large = "xl",
  "Extra Large" = "3xl",
}

export const gratitudeSchema = z.object({
  to: z.object({
    email: z.string().email("Email must be a valid email."),
    name: z.string().optional(),
  }),
  notify: z.boolean().optional().default(true),
  content: z
    .string()
    .max(180, "Keep it simple & concise :)")
    .nonempty("Don't leave the gratitude empty :)"),
  tags: z
    .array(
      z.object({
        value: z.string(),
      })
    )
    .optional(),
  bg: z
    .enum([
      Colors.Red,
      Colors.Green,
      Colors.Blue,
      Colors.Yellow,
      Colors.Purple,
      Colors.Pink,
      Colors.Indigo,
      Colors.Orange,
      Colors.Gray,
    ])
    .or(z.string()),
  typeface: z.enum([
    Typeface.Simple,
    Typeface.Bookish,
    Typeface.Technical,
    Typeface.Scribbled,
  ]),
  fontSize: z.enum([
    FontSize.Small,
    FontSize.Regular,
    FontSize.Large,
    FontSize["Extra Large"],
  ]),
})

export const profileSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters long."),
  username: z
    .string()
    .min(2, {
      message: "Username must be at least 2 characters.",
    })
    .max(30, {
      message: "Username must not be longer than 30 characters.",
    }),
  email: z.string().email("Email must be a valid email."),
  image: z.string().optional(),
  bio: z.string().max(160).min(4),
  urls: z
    .array(
      z.object({
        value: z.string().url({ message: "Please enter a valid URL." }),
      })
    )
    .optional(),
})
