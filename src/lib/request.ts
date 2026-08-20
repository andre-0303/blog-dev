import { createHash } from "node:crypto"
import { headers } from "next/headers"

/**
 * Identidade aproximada de quem fez a requisição, para limitar rajadas.
 * Guardamos só o hash: o IP em texto claro nunca chega ao banco, e do hash
 * não se volta ao endereço.
 */
export async function ipFingerprint() {
  const forwarded = (await headers()).get("x-forwarded-for")
  const ip = forwarded?.split(",")[0]?.trim()
  if (!ip) return null

  return createHash("sha256")
    .update(`${ip}${process.env.AUTH_SECRET ?? ""}`)
    .digest("hex")
}
