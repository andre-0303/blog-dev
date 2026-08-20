import Link from "next/link"
import { notFound } from "next/navigation"
import Markdown from "react-markdown"
import remarkGfm from "remark-gfm"
import { Badge } from "@/components/ui/badge"
import { getPost, readingMinutes } from "@/lib/posts"

export const dynamic = "force-dynamic"

const dateFormat = new Intl.DateTimeFormat("pt-BR", {
  day: "2-digit",
  month: "long",
  year: "numeric",
})

export default async function PostPage({ params }: PageProps<"/blog/[slug]">) {
  const { slug } = await params
  const post = await getPost(slug)
  if (!post) notFound()

  return (
    <main className="mx-auto w-full max-w-3xl px-6 py-16">
      <article>
        <header className="flex flex-col gap-4">
          {post.category && (
            <Link href={`/categorias/${post.category.slug}`}>
              <Badge
                variant="outline"
                className="font-mono tracking-widest text-muted-foreground uppercase"
              >
                {post.category.name}
              </Badge>
            </Link>
          )}

          <h1 className="font-display text-4xl leading-[1.05] tracking-tight text-balance sm:text-5xl">
            {post.title}
          </h1>

          <p className="font-mono text-xs text-muted-foreground">
            {post.author.name} · {dateFormat.format(post.createdAt)} ·{" "}
            {readingMinutes(post.content)} min de leitura
          </p>

          {post.tags.length > 0 && (
            <ul className="flex flex-wrap gap-2">
              {post.tags.map(({ tag }) => (
                <li
                  key={tag.id}
                  className="font-mono text-xs text-muted-foreground"
                >
                  #{tag.slug}
                </li>
              ))}
            </ul>
          )}
        </header>

        <div className="prose dark:prose-invert mt-12 max-w-none">
          <Markdown remarkPlugins={[remarkGfm]}>{post.content}</Markdown>
        </div>
      </article>

      <Link
        href="/blog"
        className="mt-16 inline-block font-mono text-xs tracking-widest text-muted-foreground uppercase transition-colors hover:text-foreground"
      >
        ← todos os artigos
      </Link>
    </main>
  )
}
