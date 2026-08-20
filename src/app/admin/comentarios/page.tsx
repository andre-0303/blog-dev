import Link from "next/link"
import { DeleteCommentForm } from "@/components/admin/delete-comment-form"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { avatarTone, initials } from "@/lib/avatar"
import { prisma } from "@/lib/prisma"
import { cn } from "@/lib/utils"

export const dynamic = "force-dynamic"

const dateFormat = new Intl.DateTimeFormat("pt-BR", {
  day: "2-digit",
  month: "2-digit",
  year: "numeric",
  hour: "2-digit",
  minute: "2-digit",
})

export default async function AdminComentariosPage() {
  const comments = await prisma.comment.findMany({
    orderBy: { createdAt: "desc" },
    include: { post: { select: { title: true, slug: true } } },
  })

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="font-display text-3xl tracking-tight uppercase">Comentários</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Comentários são publicados na hora. Apague daqui o que não deveria estar no ar.
        </p>
      </div>

      {comments.length > 0 ? (
        <ul className="border-t border-border">
          {comments.map((comment) => (
            <li key={comment.id} className="flex gap-4 border-b border-border py-5">
              <Avatar size="sm">
                <AvatarFallback
                  className={cn("font-medium", avatarTone(comment.authorName))}
                >
                  {initials(comment.authorName)}
                </AvatarFallback>
              </Avatar>

              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                  <p className="font-medium">{comment.authorName}</p>
                  <span className="font-mono text-xs text-muted-foreground">
                    {dateFormat.format(comment.createdAt)}
                  </span>
                  <Link
                    href={`/blog/${comment.post.slug}`}
                    className="font-mono text-xs text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
                  >
                    {comment.post.title}
                  </Link>
                </div>
                <p className="mt-2 text-sm/relaxed whitespace-pre-wrap">
                  {comment.content}
                </p>
              </div>

              <DeleteCommentForm id={comment.id} author={comment.authorName} />
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-sm text-muted-foreground">Nenhum comentário ainda.</p>
      )}
    </div>
  )
}
