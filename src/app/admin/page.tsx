import Link from "next/link"

export default function AdminPage() {
  return (
    <main className="mx-auto w-full max-w-3xl px-6 py-16">
      <h1 className="text-3xl font-semibold tracking-tight">Admin</h1>
      <nav className="mt-8 flex gap-4">
        <Link href="/admin/posts" className="hover:underline">Posts</Link>
        <Link href="/admin/categorias" className="hover:underline">Categorias</Link>
      </nav>
    </main>
  )
}
