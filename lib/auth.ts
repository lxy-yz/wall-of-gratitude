import { PrismaAdapter } from "@auth/prisma-adapter"
import bcrypt from "bcrypt"
import { NextAuthOptions } from "next-auth"
import { getServerSession } from "next-auth/next"
import Credentials from "next-auth/providers/credentials"
import EmailProvider from "next-auth/providers/email"
import GithubProvider from "next-auth/providers/github"
import GoogleProvider from "next-auth/providers/google"

import { db as prisma } from "./db"

export const authOptions: NextAuthOptions = {
  // @ts-ignore
  adapter: PrismaAdapter(prisma as any),
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
    error: "/login",
    // signOut: "/signout",
  },
  callbacks: {
    async session({ token, session }) {
      if (token) {
        session.user.id = token.id
        session.user.name = token.name as string
        session.user.username = token.username as string
        session.user.email = token.email as string
        session.user.image = token.picture as string
      }

      return session
    },
    async jwt({ token, user }) {
      const dbUser = await prisma.user.findFirst({
        where: {
          email: token.email,
        },
      })

      if (!dbUser) {
        if (user) {
          token.id = user?.id
        }
        return token
      }

      // ensure that the username is generated for the first time sign in
      // regardless of provider
      if (!dbUser.username) {
        dbUser.username = await generateUniqueUsername(dbUser.email as string)
        await prisma.user.update({
          where: {
            email: dbUser.email as string,
          },
          data: {
            username: dbUser.username,
          },
        })
      }

      return {
        id: dbUser.id,
        name: dbUser.name,
        username: dbUser.username,
        email: dbUser.email,
        picture: dbUser.image,
      }
    },
  },
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
    GoogleProvider({
      // https://next-auth.js.org/configuration/providers/oauth#allowdangerousemailaccountlinking-option
      allowDangerousEmailAccountLinking: true,
      clientId: process.env.GOOGLE_ID as string,
      clientSecret: process.env.GOOGLE_SECRET as string,
      // https://github.com/nextauthjs/next-auth/issues/7654
      // profile(profile: any) {
      //   const username = getDefaultUsername(profile.email)
      //   return {
      //     username,
      //     // https://stackoverflow.com/questions/76244244/profile-id-is-missing-in-google-oauth-profile-response-nextauth
      //     id: profile.sub,
      //     name: profile.name,
      //     firstname: profile.given_name,
      //     lastname: profile.family_name,
      //     email: profile.email,
      //     image: profile.picture,
      //   }
      // },
    }),
    EmailProvider({
      server: {
        host: process.env.EMAIL_SERVER_HOST,
        port: process.env.EMAIL_SERVER_PORT,
        auth: {
          user: process.env.EMAIL_SERVER_USER,
          pass: process.env.EMAIL_SERVER_PASSWORD,
        },
      },
      from: process.env.EMAIL_FROM,
    }),
    Credentials({
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const user = await prisma.user.findUnique({
          where: { email: credentials?.email },
        })

        if (!user || !user.password) {
          throw new Error("No user found")
        }

        const isValidPassword = await bcrypt.compare(
          credentials?.password as string,
          user.password
        )
        if (!isValidPassword) {
          throw new Error("Invalid password")
        }

        return user
      },
    }),
  ],
}

export async function getCurrentUser() {
  const session = await getServerSession(authOptions)

  return session?.user
}

export async function generateUniqueUsername(email: string) {
  let username = getDefaultUsername(email)
  while (await prisma.user.findFirst({ where: { username } })) {
    username = `${username}${Math.floor(Math.random() * 1000)}`
  }
  return username
}

function getDefaultUsername(email: string) {
  return email.split("@")[0]
}
