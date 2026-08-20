"use client"

import Link from "next/link"
import { useActionState, useState } from "react"
import Markdown from "react-markdown"
import remarkGfm from "remark-gfm"
import type { PostFormState } from "@/actions/posts"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { slugify } from "@/lib/utils"

type Option = { id: string; name: string }

export type PostFormValues = {
  title: string
  slug: string
  excerpt: string
  content: string
  categoryId: string
  tagIds: string[]
}

const empty: PostFormValues = {
  title: "",
  slug: "",
  excerpt: "",
  content: "",
  categoryId: "",
  tagIds: [],
}

function FieldError({ messages }: { messages?: string[] }) {
  if (!messages?.length) return null
  return (
    <p role="alert" className="text-xs text-destructive">
      {messages[0]}
    </p>
  )
}

export function PostForm({
  action,
  categories,
  tags,
  values = empty,
  isNew,
}: {
  action: (state: PostFormState, formData: FormData) => Promise<PostFormState>
  categories: Option[]
  tags: Option[]
  values?: PostFormValues
  isNew: boolean
}) {
  const [state, formAction, pending] = useActionState(action, {})

  const [title, setTitle] = useState(values.title)
  const [slug, setSlug] = useState(values.slug)
  // Slug segue o título até alguém editar o slug à mão.
  const [slugLocked, setSlugLocked] = useState(!isNew)
  const [excerpt, setExcerpt] = useState(values.excerpt)
  const [content, setContent] = useState(values.content)
  const [categoryId, setCategoryId] = useState(values.categoryId)
  const [tagIds, setTagIds] = useState<string[]>(values.tagIds)
  const [mode, setMode] = useState("escrever")

  return (
    <form action={formAction} className="flex max-w-3xl flex-col gap-8">
      <div className="flex flex-col gap-2">
        <Label htmlFor="title">Título</Label>
        <Input
          id="title"
          name="title"
          value={title}
          onChange={(event) => {
            setTitle(event.target.value)
            if (!slugLocked) setSlug(slugify(event.target.value))
          }}
          placeholder="Como aprender Next.js em 2026"
          className="h-10"
        />
        <FieldError messages={state.errors?.title} />
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="slug">Slug</Label>
        <Input
          id="slug"
          name="slug"
          value={slug}
          onChange={(event) => {
            setSlugLocked(true)
            setSlug(event.target.value)
          }}
          placeholder="como-aprender-nextjs-em-2026"
          className="h-10 font-mono"
        />
        <p className="text-xs text-muted-foreground">
          O artigo vai ficar em /blog/{slug || "…"}
        </p>
        <FieldError messages={state.errors?.slug} />
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="excerpt">Resumo</Label>
        <Textarea
          id="excerpt"
          name="excerpt"
          value={excerpt}
          onChange={(event) => setExcerpt(event.target.value)}
          rows={3}
          placeholder="Uma ou duas frases que aparecem na listagem."
        />
        <p className="text-xs text-muted-foreground">
          {excerpt.length}/300 caracteres
        </p>
        <FieldError messages={state.errors?.excerpt} />
      </div>

      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between gap-4">
          <Label htmlFor="content">Conteúdo</Label>
          <ToggleGroup
            value={[mode]}
            onValueChange={(value) => setMode(value[0] ?? mode)}
            variant="outline"
            spacing={0}
            aria-label="Modo do editor"
          >
            <ToggleGroupItem value="escrever">Escrever</ToggleGroupItem>
            <ToggleGroupItem value="preview">Pré-visualizar</ToggleGroupItem>
          </ToggleGroup>
        </div>

        <div hidden={mode !== "escrever"}>
          <Textarea
            id="content"
            name="content"
            value={content}
            onChange={(event) => setContent(event.target.value)}
            rows={18}
            spellCheck={false}
            placeholder={"# Introdução\n\nEscreva em Markdown."}
            className="font-mono text-sm"
          />
        </div>

        {mode === "preview" && (
          <div className="min-h-[12rem] border border-input p-6">
            {content.trim() ? (
              <div className="prose prose-sm dark:prose-invert max-w-none">
                <Markdown remarkPlugins={[remarkGfm]}>{content}</Markdown>
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">
                Nada para pré-visualizar ainda.
              </p>
            )}
          </div>
        )}

        <p className="font-mono text-xs text-muted-foreground">
          Markdown com GFM — tabelas, listas de tarefas e ~~riscado~~.
        </p>
        <FieldError messages={state.errors?.content} />
      </div>

      <Separator />

      <div className="flex flex-col gap-2">
        <Label htmlFor="categoryId">Categoria</Label>
        <Select
          name="categoryId"
          value={categoryId}
          onValueChange={(value) => setCategoryId(String(value ?? ""))}
          items={{
            "": "Sem categoria",
            ...Object.fromEntries(categories.map((c) => [c.id, c.name])),
          }}
        >
          <SelectTrigger id="categoryId" className="h-10 w-full max-w-xs">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">Sem categoria</SelectItem>
            {categories.map((category) => (
              <SelectItem key={category.id} value={category.id}>
                {category.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {categories.length === 0 && (
          <p className="text-xs text-muted-foreground">
            Nenhuma categoria ainda.{" "}
            <Link href="/admin/categorias" className="text-keyword underline-offset-4 hover:underline">
              Criar categoria
            </Link>
          </p>
        )}
      </div>

      <div className="flex flex-col gap-3">
        <Label>Tags</Label>
        {tags.length > 0 ? (
          <ToggleGroup
            multiple
            value={tagIds}
            onValueChange={(value) => setTagIds(value)}
            variant="outline"
            className="flex-wrap"
            aria-label="Tags do artigo"
          >
            {tags.map((tag) => (
              <ToggleGroupItem key={tag.id} value={tag.id}>
                {tag.name}
              </ToggleGroupItem>
            ))}
          </ToggleGroup>
        ) : (
          <p className="text-xs text-muted-foreground">
            Nenhuma tag ainda.{" "}
            <Link href="/admin/tags" className="text-keyword underline-offset-4 hover:underline">
              Criar tag
            </Link>
          </p>
        )}
        {tagIds.map((id) => (
          <input key={id} type="hidden" name="tagIds" value={id} />
        ))}
      </div>

      {state.message && (
        <p role="status" className="text-sm text-muted-foreground">
          {state.message}
        </p>
      )}

      <div className="flex flex-wrap gap-3">
        <Button
          type="submit"
          name="published"
          value="false"
          variant="outline"
          disabled={pending}
          className="h-10 px-5 text-sm"
        >
          Salvar rascunho
        </Button>
        <Button
          type="submit"
          name="published"
          value="true"
          disabled={pending}
          className="h-10 px-5 text-sm"
        >
          Publicar
        </Button>
      </div>
    </form>
  )
}
