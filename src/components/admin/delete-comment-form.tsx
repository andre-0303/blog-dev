"use client"

import { deleteComment } from "@/actions/comments"
import { Button } from "@/components/ui/button"

export function DeleteCommentForm({ id, author }: { id: string; author: string }) {
  return (
    <form
      action={deleteComment.bind(null, id)}
      onSubmit={(event) => {
        if (!confirm(`Excluir o comentário de ${author}? Isso não tem volta.`)) {
          event.preventDefault()
        }
      }}
    >
      <Button type="submit" variant="ghost" size="sm">
        Excluir
      </Button>
    </form>
  )
}
