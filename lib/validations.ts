import { z } from "zod"

export const authSchema = z.object({
  email: z.string().email("Email must valid email."),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters long.",
  }),
})
