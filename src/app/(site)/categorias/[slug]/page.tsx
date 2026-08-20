import Link from "next/link"
import { listPosts } from "@/lib/posts"

export const dynamic = "force-dynamic"

export default async function CategoriaPage({ params }: PageProps<"/categorias/[slug]">) {
  const { slug } = await params
  const posts = await listPosts({ categorySlug: slug })
  return (
    <main className="mx-auto w-full max-w-3xl px-6 py-16">
      <h1 className="text-3xl font-semibold tracking-tight">{slug}</h1>
      <ul className="mt-8 space-y-4">
        {posts.map((post) => (
          <li key={post.id}>
            <Link href={`/blog/${post.slug}`} className="hover:underline">
              {post.title}
            </Link>
          </li>
        ))}
      </ul>
    </main>
  )
}
