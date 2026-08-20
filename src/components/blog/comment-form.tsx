"use client"

import { useActionState, useEffect, useRef, useState } from "react"
import { createComment, type CommentFormState } from "@/actions/comments"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

const NOME_SALVO = "blog-dev:nome"

export function CommentForm({ postId, slug }: { postId: string; slug: string }) {
  const formRef = useRef<HTMLFormElement>(null)
  const [name, setName] = useState("")
  const [content, setContent] = useState("")

  const [state, formAction, pending] = useActionState(
    async (prev: CommentFormState, formData: FormData) => {
      const result = await createComment(postId, slug, prev, formData)
      if (result.ok) {
        setContent("")
        localStorage.setItem(NOME_SALVO, String(formData.get("authorName") ?? ""))
      }
      return result
    },
    {}
  )

  // Quem já comentou antes não precisa digitar o nome de novo.
  useEffect(() => {
    setName(localStorage.getItem(NOME_SALVO) ?? "")
  }, [])

  return (
    <form ref={formRef} action={formAction} className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <Label htmlFor="authorName">Seu nome</Label>
        <Input
          id="authorName"
          name="authorName"
          value={name}
          onChange={(event) => setName(event.target.value)}
          maxLength={50}
          required
          className="h-10 max-w-xs"
        />
        {state.errors?.authorName && (
          <p role="alert" className="text-xs text-destructive">
            {state.errors.authorName[0]}
          </p>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="content">Comentário</Label>
        <Textarea
          id="content"
          name="content"
          value={content}
          onChange={(event) => setContent(event.target.value)}
          rows={4}
          maxLength={2000}
          required
          placeholder="O que você achou do artigo?"
        />
        <p className="text-xs text-muted-foreground">{content.length}/2000</p>
        {state.errors?.content && (
          <p role="alert" className="text-xs text-destructive">
            {state.errors.content[0]}
          </p>
        )}
      </div>

      {/* Honeypot: invisível para gente, irresistível para robô. */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label htmlFor="website">Não preencha este campo</label>
        <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      {state.message && (
        <p
          role="status"
          className={state.ok ? "text-sm text-keyword" : "text-sm text-destructive"}
        >
          {state.message}
        </p>
      )}

      <div>
        <Button type="submit" disabled={pending} className="h-10 px-5 text-sm">
          {pending ? "Publicando…" : "Publicar comentário"}
        </Button>
      </div>

      <p className="text-xs text-muted-foreground">
        Sem cadastro. Seu nome aparece junto do comentário e nada além disso é
        guardado.
      </p>
    </form>
  )
}
