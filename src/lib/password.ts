import { randomBytes, scryptSync, timingSafeEqual } from "node:crypto"

const KEY_LENGTH = 64

/** Gera `salt:hash` em hex. scrypt vem do Node, sem dependência extra. */
export function hashPassword(password: string) {
  const salt = randomBytes(16)
  const hash = scryptSync(password, salt, KEY_LENGTH)
  return `${salt.toString("hex")}:${hash.toString("hex")}`
}

export function verifyPassword(password: string, stored: string) {
  const [saltHex, hashHex] = stored.split(":")
  if (!saltHex || !hashHex) return false

  const hash = Buffer.from(hashHex, "hex")
  if (hash.length !== KEY_LENGTH) return false

  const candidate = scryptSync(password, Buffer.from(saltHex, "hex"), KEY_LENGTH)
  return timingSafeEqual(hash, candidate)
}

/** Hash descartável: compara mesmo quando o e-mail não existe, para o tempo de
 *  resposta não revelar quais contas estão cadastradas. */
export const DUMMY_HASH = hashPassword(randomBytes(32).toString("hex"))
