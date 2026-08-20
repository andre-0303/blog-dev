/**
 * Cria ou atualiza o usuário do /admin.
 * Uso: pnpm admin:create "Nome" email@exemplo.com "senha"
 */
import "dotenv/config"
import { hashPassword } from "../src/lib/password"
import { prisma } from "../src/lib/prisma"

const [name, email, password] = process.argv.slice(2)

if (!name || !email || !password) {
  console.error('Uso: pnpm admin:create "Nome" email@exemplo.com "senha"')
  process.exit(1)
}

if (password.length < 12) {
  console.error("Use uma senha de pelo menos 12 caracteres.")
  process.exit(1)
}

async function main() {
  const user = await prisma.user.upsert({
    where: { email },
    update: { name, password: hashPassword(password) },
    create: { name, email, password: hashPassword(password) },
  })

  console.log(`Usuário pronto: ${user.name} <${user.email}>`)
}

main()

