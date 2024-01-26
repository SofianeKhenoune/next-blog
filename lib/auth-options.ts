import prisma from "@/lib/connect"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { getServerSession } from "next-auth"
import { Adapter } from "next-auth/adapters"
import GithubProvider from "next-auth/providers/github"
import GoogleProvider from "next-auth/providers/google"

export const authOptions = {
  debug: true,
  adapter: PrismaAdapter(prisma) as Adapter,
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    maxAge: 1 * 60 * 60,
  },
}

export const getAuthSession = () => getServerSession(authOptions)
