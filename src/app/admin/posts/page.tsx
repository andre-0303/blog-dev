import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { prisma } from "@/lib/prisma"
import { cn } from "@/lib/utils"

export const dynamic = "force-dynamic"

const dateFormat = new Intl.DateTimeFormat("pt-BR", {
  day: "2-digit",
  month: "2-digit",
  year: "numeric",
})

const filters = [
  { status: "", label: "Todos", href: "/admin/posts" },
  { status: "publicados", label: "Publicados", href: "/admin/posts?status=publicados" },
  { status: "rascunhos", label: "Rascunhos", href: "/admin/posts?status=rascunhos" },
]

export default async function AdminPostsPage({
  searchParams,
}: PageProps<"/admin/posts">) {
  const status = String((await searchParams).status ?? "")

  const posts = await prisma.post.findMany({
    where:
      status === "publicados"
        ? { published: true }
        : status === "rascunhos"
          ? { published: false }
          : {},
    orderBy: { updatedAt: "desc" },
    include: { category: true },
  })

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="font-display text-3xl tracking-tight uppercase">Posts</h1>
        <Button
          nativeButton={false}
          className="h-10 px-5 text-sm"
          render={<Link href="/admin/posts/novo">Novo post</Link>}
        />
      </div>

      <nav aria-label="Filtrar por estado" className="flex gap-1 border-b border-border">
        {filters.map((filter) => (
          <Link
            key={filter.label}
            href={filter.href}
            aria-current={status === filter.status ? "page" : undefined}
            className={cn(
              "-mb-px border-b-2 px-3 py-2 font-mono text-xs tracking-widest uppercase transition-colors",
              status === filter.status
                ? "border-keyword text-foreground"
                : "border-transparent text-muted-foreground hover:text-foreground"
            )}
          >
            {filter.label}
          </Link>
        ))}
      </nav>

      {posts.length > 0 ? (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Título</TableHead>
              <TableHead>Categoria</TableHead>
              <TableHead>Estado</TableHead>
              <TableHead>Atualizado</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {posts.map((post) => (
              <TableRow key={post.id}>
                <TableCell className="font-medium">
                  <Link
                    href={`/admin/posts/${post.id}`}
                    className="underline-offset-4 hover:underline"
                  >
                    {post.title}
                  </Link>
                  <span className="block font-mono text-xs text-muted-foreground">
                    /blog/{post.slug}
                  </span>
                </TableCell>
                <TableCell className="text-muted-foreground">
                  {post.category?.name ?? "—"}
                </TableCell>
                <TableCell>
                  <Badge variant={post.published ? "default" : "outline"}>
                    {post.published ? "publicado" : "rascunho"}
                  </Badge>
                </TableCell>
                <TableCell className="font-mono text-muted-foreground">
                  {dateFormat.format(post.updatedAt)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : (
        <p className="text-sm text-muted-foreground">
          Nenhum artigo{status ? " nesse estado" : ""}.
        </p>
      )}
    </div>
  )
}
