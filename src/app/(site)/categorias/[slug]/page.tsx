import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { PostList } from "@/components/blog/post-list"
import { listPosts, toPostPreview } from "@/lib/posts"
import { prisma } from "@/lib/prisma"

// Página estática revalidada de hora em hora. Publicar ou editar no /admin
// chama revalidatePath e atualiza na hora — o prazo é só a rede de segurança.
export const revalidate = 3600

export async function generateStaticParams() {
  const categories = await prisma.category.findMany({
    where: { posts: { some: { published: true } } },
    select: { slug: true },
  })

  return categories.map((category) => ({ slug: category.slug }))
}

export async function generateMetadata({
  params,
}: PageProps<"/categorias/[slug]">): Promise<Metadata> {
  const { slug } = await params
  const category = await prisma.category.findUnique({ where: { slug } })

  if (!category) {
    return { title: "Categoria não encontrada", robots: { index: false, follow: false } }
  }

  const url = `/categorias/${category.slug}`

  return {
    title: category.name,
    description: `Artigos do Blog Dev sobre ${category.name}.`,
    alternates: { canonical: url },
    openGraph: { url, title: category.name },
  }
}

export default async function CategoriaPage({
  params,
}: PageProps<"/categorias/[slug]">) {
  const { slug } = await params

  const category = await prisma.category.findUnique({ where: { slug } })
  if (!category) notFound()

  const posts = (await listPosts({ categorySlug: slug })).map(toPostPreview)

  return (
    <main className="mx-auto w-full max-w-5xl px-6 py-16">
      <div>
          <p className="font-mono text-xs tracking-widest text-muted-foreground uppercase">
            Categoria
          </p>
          <h1 className="mt-2 font-display text-4xl tracking-tight uppercase sm:text-5xl">
            {category.name}
          </h1>
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
