import Link from "next/link"
import { PostList } from "@/components/blog/post-list"
import { listPosts, toPostPreview } from "@/lib/posts"

export const dynamic = "force-dynamic"

export const metadata = { title: "Blog · Blog Dev" }

export default async function BlogPage() {
  const posts = (await listPosts()).map(toPostPreview)

  return (
    <main className="mx-auto w-full max-w-5xl px-6 py-16">
      <div className="grid gap-x-6 md:grid-cols-[3rem_minmax(0,1fr)]">
        <span aria-hidden="true" className="hidden font-mono text-2xl text-keyword md:block">
          #
        </span>
        <div>
          <h1 className="font-display text-4xl tracking-tight uppercase sm:text-5xl">
            Artigos
          </h1>
          <p className="mt-3 text-sm text-muted-foreground">
            {posts.length === 1 ? "1 artigo publicado" : `${posts.length} artigos publicados`}
          </p>
        </div>
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
