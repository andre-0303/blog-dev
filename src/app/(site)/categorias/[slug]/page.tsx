import { notFound } from "next/navigation"
import { PostList } from "@/components/blog/post-list"
import { listPosts, toPostPreview } from "@/lib/posts"
import { prisma } from "@/lib/prisma"

export const dynamic = "force-dynamic"

export default async function CategoriaPage({
  params,
}: PageProps<"/categorias/[slug]">) {
  const { slug } = await params

  const category = await prisma.category.findUnique({ where: { slug } })
  if (!category) notFound()

  const posts = (await listPosts({ categorySlug: slug })).map(toPostPreview)

  return (
    <main className="mx-auto w-full max-w-5xl px-6 py-16">
      <div className="grid gap-x-6 md:grid-cols-[3rem_minmax(0,1fr)]">
        <span aria-hidden="true" className="hidden font-mono text-2xl text-keyword md:block">
          #
        </span>
        <div>
          <p className="font-mono text-xs tracking-widest text-muted-foreground uppercase">
            Categoria
          </p>
          <h1 className="mt-2 font-display text-4xl tracking-tight uppercase sm:text-5xl">
            {category.name}
          </h1>
        </div>
      </div>

      <div className="mt-10">
        {posts.length > 0 ? (
          <PostList posts={posts} />
        ) : (
          <p className="text-sm text-muted-foreground">
            Nenhum artigo publicado nessa categoria ainda.
          </p>
        )}
      </div>
    </main>
  )
}
