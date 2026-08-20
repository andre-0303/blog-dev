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

export const dynamic = "force-dynamic"

const dateFormat = new Intl.DateTimeFormat("pt-BR", {
  day: "2-digit",
  month: "2-digit",
  year: "numeric",
})

export default async function AdminPage() {
  const [published, drafts, categories, tags, comments, recent] = await Promise.all([
    prisma.post.count({ where: { published: true } }),
    prisma.post.count({ where: { published: false } }),
    prisma.category.count(),
    prisma.tag.count(),
    prisma.comment.count(),
    prisma.post.findMany({
      orderBy: { updatedAt: "desc" },
      take: 5,
      include: { category: true },
    }),
  ])

  const stats = [
    { label: "Publicados", value: published, href: "/admin/posts?status=publicados" },
    { label: "Rascunhos", value: drafts, href: "/admin/posts?status=rascunhos" },
    { label: "Categorias", value: categories, href: "/admin/categorias" },
    { label: "Tags", value: tags, href: "/admin/tags" },
    { label: "Comentários", value: comments, href: "/admin/comentarios" },
  ]

  return (
    <div className="flex flex-col gap-10">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="font-display text-3xl tracking-tight uppercase">Dashboard</h1>
        <Button
          nativeButton={false}
          className="h-10 px-5 text-sm"
          render={<Link href="/admin/posts/novo">Novo post</Link>}
        />
      </div>

      <dl className="grid gap-px border border-border bg-border sm:grid-cols-2 lg:grid-cols-5">
        {stats.map((stat) => (
          <Link
            key={stat.label}
            href={stat.href}
            className="group bg-background p-5 transition-colors hover:bg-muted/60"
          >
            <dt className="font-mono text-[0.65rem] tracking-widest text-muted-foreground uppercase">
              {stat.label}
            </dt>
            <dd className="mt-2 font-display text-4xl tracking-tight">{stat.value}</dd>
          </Link>
        ))}
      </dl>

      <section className="flex flex-col gap-4">
        <div className="flex items-baseline justify-between gap-4">
          <h2 className="font-display text-lg tracking-tight uppercase">
            Editados recentemente
          </h2>
          <Link
            href="/admin/posts"
            className="font-mono text-xs tracking-widest text-muted-foreground uppercase hover:text-foreground"
          >
            ver todos
          </Link>
        </div>

        {recent.length > 0 ? (
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
              {recent.map((post) => (
                <TableRow key={post.id}>
                  <TableCell className="font-medium">
                    <Link
                      href={`/admin/posts/${post.id}`}
                      className="underline-offset-4 hover:underline"
                    >
                      {post.title}
                    </Link>
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
            Nenhum artigo ainda. Comece pelo{" "}
            <Link
              href="/admin/posts/novo"
              className="text-keyword underline-offset-4 hover:underline"
            >
              primeiro post
            </Link>
            .
          </p>
        )}
      </section>
    </div>
  )
}
