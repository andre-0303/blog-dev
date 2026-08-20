import Link from "next/link"
import { prisma } from "@/lib/prisma"

// Página estática revalidada de hora em hora. Publicar ou editar no /admin
// chama revalidatePath e atualiza na hora — o prazo é só a rede de segurança.
export const revalidate = 3600

export const metadata = {
  title: "Categorias",
  description: "Os assuntos cobertos pelo Blog Dev.",
  alternates: { canonical: "/categorias" },
  openGraph: { url: "/categorias", title: "Categorias" },
}

export default async function CategoriasPage() {
  const categories = await prisma.category.findMany({
    orderBy: { name: "asc" },
    include: { _count: { select: { posts: true } } },
  })

  return (
    <main className="mx-auto w-full max-w-5xl px-6 py-16">
      <h1 className="font-display text-4xl tracking-tight uppercase">Categorias</h1>

      {categories.length > 0 ? (
        <ul className="mt-10 border-t border-border">
          {categories.map((category) => (
            <li key={category.id} className="border-b border-border">
              <Link
                href={`/categorias/${category.slug}`}
                className="flex items-baseline justify-between gap-4 px-2 py-5 transition-colors hover:bg-muted/70"
              >
                <span className="font-display text-xl tracking-tight">
                  {category.name}
                </span>
                <span className="font-mono text-xs text-muted-foreground">
                  {category._count.posts} artigos
                </span>
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <p className="mt-10 text-sm text-muted-foreground">
          Nenhuma categoria cadastrada ainda.
        </p>
      )}
    </main>
  )
}
