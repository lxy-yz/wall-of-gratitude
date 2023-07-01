import { PrismaAdapter } from '@auth/prisma-adapter'
import { getServerSession } from 'next-auth/next'
import GithubProvider from 'next-auth/providers/github'
import GoogleProvider from 'next-auth/providers/google'
import { db as prisma } from './db'

export const authOptions = {
  adapter: PrismaAdapter(prisma),
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  // https://next-auth.js.org/configuration/pages
  pages: {
    signIn: "/auth/signin",
    // signOut: '/auth/signout',
    // error: '/auth/error', // Error code passed in query string as ?error=
    // verifyRequest: '/auth/verify-request', // (used for check email message)
    // newUser: '/auth/new-user' // New users will be directed here on first sign in (leave the property out if not of interest)
  },
  callbacks: {
    // https://github.com/nextauthjs/next-auth/discussions/536
    // session: async ({ session, token }) => {
    //   if (session?.user) {
    //     session.user.id = token.sub;
    //   }
    //   return session;
    // },
    // // https://next-auth.js.org/configuration/callbacks#jwt-callback
    // async jwt({ token, user, account, profile, isNewUser }) {
    //   // Add user ID to token on successful login
    //   if (user) {
    //     token.role = user.role;
    //   }
    //   return token;
    // },
  },

  // Configure one or more authentication providers
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID as string,
      clientSecret: process.env.GOOGLE_SECRET as string
    })
    // ...add more providers here
  ]
}

export async function getCurrentUser() {
  const session = await getServerSession(authOptions)

  return session?.user
}
