import Link from "next/link"
import { PostList } from "@/components/blog/post-list"
import { listPosts, toPostPreview } from "@/lib/posts"

// Página estática revalidada de hora em hora. Publicar ou editar no /admin
// chama revalidatePath e atualiza na hora — o prazo é só a rede de segurança.
export const revalidate = 3600

export const metadata = {
  title: "Artigos",
  description:
    "Todos os artigos do Blog Dev: projetos, experimentos e decisões de arquitetura documentados enquanto acontecem.",
  alternates: { canonical: "/blog" },
  openGraph: { url: "/blog", title: "Artigos" },
}

export default async function BlogPage() {
  const posts = (await listPosts()).map(toPostPreview)

  return (
    <main className="mx-auto w-full max-w-5xl px-6 py-16">
      <div>
          <h1 className="font-display text-4xl tracking-tight uppercase sm:text-5xl">
            Artigos
          </h1>
          <p className="mt-3 text-sm text-muted-foreground">
            {posts.length === 1 ? "1 artigo publicado" : `${posts.length} artigos publicados`}
          </p>
      </div>

      <div className="mt-10">
        {posts.length > 0 ? (
          <PostList posts={posts} />
        ) : (
          <p className="text-sm text-muted-foreground">
            Nenhum artigo publicado ainda.{" "}
            <Link
              href="/admin/posts/novo"
              className="text-keyword underline-offset-4 hover:underline"
            >
              Escrever o primeiro
            </Link>
          </p>
        )}
      </div>
    </main>
  )
}
