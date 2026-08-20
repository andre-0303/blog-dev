import Link from "next/link"
import { notFound } from "next/navigation"
import { updatePost } from "@/actions/posts"
import { DeletePostForm } from "@/components/admin/delete-post-form"
import { PostForm } from "@/components/admin/post-form"
import { Badge } from "@/components/ui/badge"
import { prisma } from "@/lib/prisma"

export const dynamic = "force-dynamic"

export default async function EditarPostPage({
  params,
}: PageProps<"/admin/posts/[id]">) {
  const { id } = await params

  const [post, categories, tags] = await Promise.all([
    prisma.post.findUnique({ where: { id }, include: { tags: true } }),
    prisma.category.findMany({ orderBy: { name: "asc" } }),
    prisma.tag.findMany({ orderBy: { name: "asc" } }),
  ])

  if (!post) notFound()

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <h1 className="font-display text-3xl tracking-tight uppercase">
            Editar artigo
          </h1>
          <Badge variant={post.published ? "default" : "outline"}>
            {post.published ? "publicado" : "rascunho"}
          </Badge>
        </div>

        <div className="flex items-center gap-3">
          {post.published && (
            <Link
              href={`/blog/${post.slug}`}
              className="font-mono text-xs tracking-widest text-muted-foreground uppercase hover:text-foreground"
            >
              ver no site
            </Link>
          )}
          <DeletePostForm id={post.id} title={post.title} />
        </div>
      </div>

      <PostForm
        action={updatePost.bind(null, post.id)}
        categories={categories}
        tags={tags}
        isNew={false}
        values={{
          title: post.title,
          slug: post.slug,
          excerpt: post.excerpt ?? "",
          content: post.content,
          categoryId: post.categoryId ?? "",
          tagIds: post.tags.map((tag) => tag.tagId),
        }}
      />
    </div>
  )
}
