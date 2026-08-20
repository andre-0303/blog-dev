import { PrismaPg } from "@prisma/adapter-pg"
import { PrismaClient } from "@/lib/generated/prisma/client"

/** Erros de conexão, não de dados: vale tentar de novo. */
const RETRYABLE = new Set([
  "ETIMEDOUT",
  "ECONNRESET",
  "ECONNREFUSED",
  "EPIPE",
  "57P01", // admin_shutdown — o Neon derrubou a conexão ociosa
])

function isRetryable(error: unknown): boolean {
  const code = (error as { code?: string })?.code
  return typeof code === "string" && RETRYABLE.has(code)
}

function createPrismaClient() {
  const adapter = new PrismaPg({
    connectionString: process.env.DATABASE_URL!,
    // O compute do Neon suspende quando fica ocioso e leva alguns segundos para
    // acordar. Sem esses limites a primeira consulta depois da pausa estoura.
    connectionTimeoutMillis: 15_000,
    keepAlive: true,
    keepAliveInitialDelayMillis: 10_000,
    max: 5,
  })

  return new PrismaClient({ adapter }).$extends({
    query: {
      async $allOperations({ args, query }) {
        try {
          return await query(args)
        } catch (error) {
          if (!isRetryable(error)) throw error
          // Uma tentativa só: se o banco acordou, ela passa; se está fora do ar,
          // o erro sobe igual e ninguém fica preso em ciclo de retentativa.
          await new Promise((resolve) => setTimeout(resolve, 300))
          return query(args)
        }
      },
    },
  })
}

// O HMR reavalia este módulo a cada edição em desenvolvimento. Sem guardar a
// instância no globalThis, cada recarga abriria um pool novo e deixaria o
// anterior aberto.
const globalForPrisma = globalThis as unknown as {
  prisma?: ReturnType<typeof createPrismaClient>
}

export const prisma = globalForPrisma.prisma ?? createPrismaClient()

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma
}
