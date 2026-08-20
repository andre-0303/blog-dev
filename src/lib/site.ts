/** Fonte única de verdade para metadata, sitemap, robots e JSON-LD. */
export const site = {
  name: "Blog Dev",
  title: "Blog Dev — tecnologia vista através da prática",
  description:
    "Um laboratório público de desenvolvimento: projetos construídos do zero, experimentos, decisões de arquitetura e o que deu errado no caminho.",
  author: "André Bandeira",
  locale: "pt_BR",
  // Sem prefixo NEXT_PUBLIC_: só o servidor usa isso (metadata, sitemap, robots,
  // OG). Assim dá para trocar o domínio no deploy sem refazer o build.
  url: new URL(process.env.SITE_URL ?? "http://localhost:3000"),
} as const

export function absoluteUrl(path: string) {
  return new URL(path, site.url).toString()
}
