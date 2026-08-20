import { createPost } from "@/actions/posts"
import { PostForm } from "@/components/admin/post-form"
import { prisma } from "@/lib/prisma"

export const dynamic = "force-dynamic"

export default async function NovoPostPage() {
  const [categories, tags] = await Promise.all([
    prisma.category.findMany({ orderBy: { name: "asc" } }),
    prisma.tag.findMany({ orderBy: { name: "asc" } }),
  ])

  return (
    <div className="flex flex-col gap-8">
      <h1 className="font-display text-3xl tracking-tight uppercase">Novo artigo</h1>
      <PostForm action={createPost} categories={categories} tags={tags} isNew />
    </div>
  )
}
