import type { MetadataRoute } from "next"
import { absoluteUrl } from "@/lib/site"

// Usa SITE_URL em tempo de execução, então não pode ser congelado no build.
export const dynamic = "force-dynamic"

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // Painel e rotas de autenticação não têm o que indexar.
      disallow: ["/admin", "/login", "/api/"],
    },
    sitemap: absoluteUrl("/sitemap.xml"),
  }
}
