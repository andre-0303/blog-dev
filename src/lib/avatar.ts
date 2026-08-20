/**
 * Avatar sem conta e sem rede: as iniciais vêm do nome digitado e o tom sai de
 * um hash do próprio nome — o mesmo nome cai sempre no mesmo tom.
 */

/** Tons construídos com a paleta do site, para não estourar o preto/branco/acento. */
const TONES = [
  "bg-foreground text-background",
  "bg-keyword text-white",
  "bg-muted text-foreground",
  "bg-foreground/70 text-background",
  "bg-keyword/15 text-keyword",
  "bg-muted-foreground/25 text-foreground",
]

function hash(value: string) {
  let h = 0
  for (let i = 0; i < value.length; i++) {
    h = (h * 31 + value.charCodeAt(i)) | 0
  }
  return Math.abs(h)
}

export function avatarTone(name: string) {
  return TONES[hash(name.trim().toLowerCase()) % TONES.length]
}

export function initials(name: string) {
  const parts = name.trim().split(/\s+/).filter(Boolean)
  if (parts.length === 0) return "?"

  const first = parts[0][0]
  const last = parts.length > 1 ? parts[parts.length - 1][0] : ""
  return (first + last).toUpperCase()
}
