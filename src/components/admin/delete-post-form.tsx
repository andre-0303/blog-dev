"use client"

import { deletePost } from "@/actions/posts"
import { Button } from "@/components/ui/button"

export function DeletePostForm({ id, title }: { id: string; title: string }) {
  return (
    <form
      action={deletePost.bind(null, id)}
      onSubmit={(event) => {
        if (!confirm(`Excluir "${title}"? Isso não tem volta.`)) {
          event.preventDefault()
        }
      }}
    >
      <Button type="submit" variant="destructive" size="sm">
        Excluir
      </Button>
    </form>
  )
}
