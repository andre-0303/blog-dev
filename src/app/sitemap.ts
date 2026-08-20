import type { MetadataRoute } from "next"
import { prisma } from "@/lib/prisma"
import { absoluteUrl } from "@/lib/site"

// Depende do banco: nunca deve ser congelado no build.
export const dynamic = "force-dynamic"

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [posts, categories] = await Promise.all([
    prisma.post.findMany({
      where: { published: true },
      select: { slug: true, updatedAt: true },
      orderBy: { updatedAt: "desc" },
    }),
    prisma.category.findMany({
      where: { posts: { some: { published: true } } },
      select: { slug: true, updatedAt: true },
    }),
  ])

  const maisRecente = posts[0]?.updatedAt ?? new Date()

  return [
    { url: absoluteUrl("/"), lastModified: maisRecente, changeFrequency: "daily", priority: 1 },
    { url: absoluteUrl("/blog"), lastModified: maisRecente, changeFrequency: "daily", priority: 0.9 },
    { url: absoluteUrl("/categorias"), lastModified: maisRecente, changeFrequency: "weekly", priority: 0.6 },
    { url: absoluteUrl("/sobre"), lastModified: maisRecente, changeFrequency: "yearly", priority: 0.5 },

    ...posts.map((post) => ({
      url: absoluteUrl(`/blog/${post.slug}`),
      lastModified: post.updatedAt,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),

    ...categories.map((category) => ({
      url: absoluteUrl(`/categorias/${category.slug}`),
      lastModified: category.updatedAt,
      changeFrequency: "weekly" as const,
      priority: 0.5,
    })),
  ]
}
