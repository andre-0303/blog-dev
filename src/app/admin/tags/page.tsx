import { createTag, deleteTag } from "@/actions/taxonomy"
import { TaxonomyManager } from "@/components/admin/taxonomy-manager"
import { prisma } from "@/lib/prisma"

export const dynamic = "force-dynamic"

export default async function AdminTagsPage() {
  const tags = await prisma.tag.findMany({
    orderBy: { name: "asc" },
    include: { _count: { select: { posts: true } } },
  })

  return (
    <div className="flex flex-col gap-8">
      <h1 className="font-display text-3xl tracking-tight uppercase">Tags</h1>
      <TaxonomyManager
        entries={tags.map((tag) => ({
          id: tag.id,
          name: tag.name,
          slug: tag.slug,
          count: tag._count.posts,
        }))}
        createAction={createTag}
        deleteAction={deleteTag}
        label="Nova tag"
        placeholder="server-actions"
        countLabel="Artigos"
      />
    </div>
  )
}
