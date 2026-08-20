import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import { redirect } from "next/navigation"
import { z } from "zod"
import { DUMMY_HASH, verifyPassword } from "@/lib/password"
import { prisma } from "@/lib/prisma"

const credentialsSchema = z.object({
  email: z.email(),
  password: z.string().min(1),
})

export const { handlers, auth, signIn, signOut } = NextAuth({
  trustHost: true,
  session: { strategy: "jwt" },
  pages: { signIn: "/login" },
  providers: [
    Credentials({
      credentials: { email: {}, password: {} },
      async authorize(raw) {
        const parsed = credentialsSchema.safeParse(raw)
        if (!parsed.success) return null

        const user = await prisma.user.findUnique({
          where: { email: parsed.data.email },
        })
        if (!user) {
          verifyPassword(parsed.data.password, DUMMY_HASH)
          return null
        }
        if (!verifyPassword(parsed.data.password, user.password)) return null

        return { id: user.id, name: user.name, email: user.email }
      },
    }),
  ],
  callbacks: {
    jwt({ token, user }) {
      if (user?.id) token.sub = user.id
      return token
    },
    session({ session, token }) {
      if (token.sub) session.user.id = token.sub
      return session
    },
  },
})

/** Guarda para layouts e Server Actions. Server Action sem guarda é rota aberta. */
export async function requireUser() {
  const user = (await auth())?.user
  if (!user?.id) redirect("/login")

  return { id: user.id, name: user.name, email: user.email }
}
