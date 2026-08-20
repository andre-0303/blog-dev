import Link from "next/link"
import { prisma } from "@/lib/prisma"

export const dynamic = "force-dynamic"

export default async function AdminPostsPage() {
  const posts = await prisma.post.findMany({ orderBy: { updatedAt: "desc" } })
  return (
    <main className="mx-auto w-full max-w-3xl px-6 py-16">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-semibold tracking-tight">Posts</h1>
        <Link href="/admin/posts/novo" className="hover:underline">Novo</Link>
      </div>
      <ul className="mt-8 space-y-4">
        {posts.map((post) => (
          <li key={post.id}>
            <Link href={`/admin/posts/${post.id}`} className="hover:underline">
              {post.title}
            </Link>
            {!post.published && <span className="ml-2 text-sm text-zinc-500">rascunho</span>}
          </li>
        ))}
      </ul>
    </main>
  )
}
