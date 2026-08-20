import { CommentForm } from "@/components/blog/comment-form"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { avatarTone, initials } from "@/lib/avatar"
import { prisma } from "@/lib/prisma"
import { cn } from "@/lib/utils"

const dateFormat = new Intl.DateTimeFormat("pt-BR", {
  day: "2-digit",
  month: "short",
  year: "numeric",
  hour: "2-digit",
  minute: "2-digit",
})

export async function CommentSection({
  postId,
  slug,
}: {
  postId: string
  slug: string
}) {
  const comments = await prisma.comment.findMany({
    where: { postId },
    orderBy: { createdAt: "asc" },
  })

  return (
    <section className="mt-20">
      <Separator />

      <div className="mt-12 flex items-baseline justify-between gap-4">
        <h2 className="font-display text-lg tracking-tight uppercase">
          Comentários
        </h2>
        <span className="font-mono text-xs text-muted-foreground">
          {comments.length}
        </span>
      </div>

      {comments.length > 0 ? (
        <ul className="mt-8 flex flex-col gap-8">
          {comments.map((comment) => (
            <li key={comment.id} className="flex gap-4">
              <Avatar>
                <AvatarFallback
                  className={cn("font-medium", avatarTone(comment.authorName))}
                >
                  {initials(comment.authorName)}
                </AvatarFallback>
              </Avatar>

              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                  <p className="font-medium">{comment.authorName}</p>
                  <time
                    dateTime={comment.createdAt.toISOString()}
                    className="font-mono text-xs text-muted-foreground"
                  >
                    {dateFormat.format(comment.createdAt)}
                  </time>
                </div>
                <p className="mt-2 text-sm/relaxed whitespace-pre-wrap">
                  {comment.content}
                </p>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="mt-8 text-sm text-muted-foreground">
          Nenhum comentário ainda. Comece a conversa.
        </p>
      )}

      <div className="mt-12">
        <CommentForm postId={postId} slug={slug} />
      </div>
    </section>
  )
}
