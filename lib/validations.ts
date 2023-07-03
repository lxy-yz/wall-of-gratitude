import { z } from "zod"

export const authSchema = z.object({
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

export const noteSchema = z.object({
  to: z.string().min(3, "To must be at least 3 characters long."),
  notify: z.boolean().optional().default(true),
  content: z.string().nonempty("Don't leave the gratitude empty :)"),
  tags: z.array(z.string()).optional(),
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
  password: z.string(),
})
