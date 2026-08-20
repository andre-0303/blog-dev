import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import { redirect } from "next/navigation"
import { z } from "zod"
import { DUMMY_HASH, verifyPassword } from "@/lib/password"
import { prisma } from "@/lib/prisma"
import { ipFingerprint } from "@/lib/request"

const credentialsSchema = z.object({
  email: z.email(),
  password: z.string().min(1),
})

/** Cinco erros em quinze minutos e a origem fica de castigo. */
const LOGIN_LIMIT = { tentativas: 5, janelaMs: 15 * 60_000 }

async function excedeuTentativas(ipHash: string) {
  const desde = new Date(Date.now() - LOGIN_LIMIT.janelaMs)

  // Aproveita a ida ao banco para varrer o que já expirou.
  await prisma.loginAttempt.deleteMany({ where: { createdAt: { lt: desde } } })

  const falhas = await prisma.loginAttempt.count({
    where: { ipHash, createdAt: { gte: desde } },
  })

  return falhas >= LOGIN_LIMIT.tentativas
}

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

        const ipHash = await ipFingerprint()
        if (ipHash && (await excedeuTentativas(ipHash))) return null

        const registrarFalha = async () => {
          if (ipHash) await prisma.loginAttempt.create({ data: { ipHash } })
        }

        const user = await prisma.user.findUnique({
          where: { email: parsed.data.email },
        })
        if (!user) {
          verifyPassword(parsed.data.password, DUMMY_HASH)
          await registrarFalha()
          return null
        }
        if (!verifyPassword(parsed.data.password, user.password)) {
          await registrarFalha()
          return null
        }

        // Login certo zera o contador da origem.
        if (ipHash) await prisma.loginAttempt.deleteMany({ where: { ipHash } })

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
