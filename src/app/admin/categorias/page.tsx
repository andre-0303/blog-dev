import { createCategory, deleteCategory } from "@/actions/taxonomy"
import { TaxonomyManager } from "@/components/admin/taxonomy-manager"
import { prisma } from "@/lib/prisma"

export const dynamic = "force-dynamic"

export default async function AdminCategoriasPage() {
  const categories = await prisma.category.findMany({
    orderBy: { name: "asc" },
    include: { _count: { select: { posts: true } } },
  })

  return (
    <div className="flex flex-col gap-8">
      <h1 className="font-display text-3xl tracking-tight uppercase">Categorias</h1>
      <TaxonomyManager
        entries={categories.map((category) => ({
          id: category.id,
          name: category.name,
          slug: category.slug,
          count: category._count.posts,
        }))}
        createAction={createCategory}
        deleteAction={deleteCategory}
        label="Nova categoria"
        placeholder="Next.js"
        countLabel="Artigos"
      />
    </div>
  )
}
