import { notFound } from "next/navigation"
import Markdown from "react-markdown"
import remarkGfm from "remark-gfm"
import { getPost } from "@/actions/posts"

export const dynamic = "force-dynamic"

export default async function PostPage({ params }: PageProps<"/blog/[slug]">) {
  const { slug } = await params
  const post = await getPost(slug)
  if (!post || !post.published) notFound()

  return (
    <article className="mx-auto w-full max-w-3xl px-6 py-16">
      <h1 className="text-3xl font-semibold tracking-tight">{post.title}</h1>
      <p className="mt-2 text-sm text-zinc-500">{post.author.name}</p>
      <div className="prose dark:prose-invert mt-8 max-w-none">
        <Markdown remarkPlugins={[remarkGfm]}>{post.content}</Markdown>
      </div>
    </article>
  )
}
