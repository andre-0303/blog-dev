import { prisma } from "@/lib/prisma"

export const dynamic = "force-dynamic"

export default async function AdminCategoriasPage() {
  const categories = await prisma.category.findMany({ orderBy: { name: "asc" } })
  return (
    <main className="mx-auto w-full max-w-3xl px-6 py-16">
      <h1 className="text-3xl font-semibold tracking-tight">Categorias</h1>
      <ul className="mt-8 space-y-4">
        {categories.map((category) => (
          <li key={category.id}>{category.name}</li>
        ))}
      </ul>
    </main>
  )
}
