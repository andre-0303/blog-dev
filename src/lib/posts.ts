import { prisma } from "@/lib/prisma"

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
