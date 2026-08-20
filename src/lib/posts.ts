import { prisma } from "@/lib/prisma"
import type { PostPreview } from "@/types/post"

export function listPosts(where?: { categorySlug?: string }) {
  return prisma.post.findMany({
    where: {
      published: true,
      ...(where?.categorySlug && { category: { slug: where.categorySlug } }),
    },
    orderBy: { createdAt: "desc" },
    include: { author: true, category: true },
  })
}

export function getPost(slug: string) {
  return prisma.post.findFirst({
    where: { slug, published: true },
    include: { author: true, category: true, tags: { include: { tag: true } } },
  })
}

/** ~200 palavras por minuto, arredondando para cima. */
export function readingMinutes(content: string) {
  const words = content.trim().split(/\s+/).filter(Boolean).length
  return Math.max(1, Math.ceil(words / 200))
}

type ListedPost = {
  title: string
  slug: string
  excerpt: string | null
  content: string
  createdAt: Date
  category: { name: string } | null
}

export function toPostPreview(post: ListedPost): PostPreview {
  return {
    slug: post.slug,
    title: post.title,
    excerpt: post.excerpt ?? "",
    category: post.category?.name ?? null,
    minutes: readingMinutes(post.content),
    publishedAt: post.createdAt,
  }
}
