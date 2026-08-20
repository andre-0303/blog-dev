"use client"

import { useActionState, useRef } from "react"
import type { TaxonomyFormState } from "@/actions/taxonomy"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

type Entry = { id: string; name: string; slug: string; count: number }

export function TaxonomyManager({
  entries,
  createAction,
  deleteAction,
  label,
  placeholder,
  countLabel,
}: {
  entries: Entry[]
  createAction: (
    state: TaxonomyFormState,
    formData: FormData
  ) => Promise<TaxonomyFormState>
  deleteAction: (id: string) => Promise<void>
  label: string
  placeholder: string
  countLabel: string
}) {
  const formRef = useRef<HTMLFormElement>(null)
  const [state, formAction, pending] = useActionState(
    async (prev: TaxonomyFormState, formData: FormData) => {
      const result = await createAction(prev, formData)
      if (!result.errors) formRef.current?.reset()
      return result
    },
    {}
  )

  return (
    <div className="flex flex-col gap-8">
      <form
        ref={formRef}
        action={formAction}
        className="flex max-w-md flex-col gap-2"
      >
        <Label htmlFor="name">{label}</Label>
        <div className="flex gap-2">
          <Input id="name" name="name" placeholder={placeholder} className="h-10" />
          <Button type="submit" disabled={pending} className="h-10 px-5 text-sm">
            Adicionar
          </Button>
        </div>
        {state.errors?.name && (
          <p role="alert" className="text-xs text-destructive">
            {state.errors.name[0]}
          </p>
        )}
        {state.message && (
          <p role="status" className="text-xs text-muted-foreground">
            {state.message}
          </p>
        )}
      </form>

      {entries.length > 0 ? (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nome</TableHead>
              <TableHead>Slug</TableHead>
              <TableHead>{countLabel}</TableHead>
              <TableHead className="w-0" />
            </TableRow>
          </TableHeader>
          <TableBody>
            {entries.map((entry) => (
              <TableRow key={entry.id}>
                <TableCell className="font-medium">{entry.name}</TableCell>
                <TableCell className="font-mono text-muted-foreground">
                  {entry.slug}
                </TableCell>
                <TableCell className="text-muted-foreground">{entry.count}</TableCell>
                <TableCell>
                  <form
                    action={deleteAction.bind(null, entry.id)}
                    onSubmit={(event) => {
                      if (!confirm(`Excluir "${entry.name}"?`)) event.preventDefault()
                    }}
                  >
                    <Button type="submit" variant="ghost" size="sm">
                      Excluir
                    </Button>
                  </form>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : (
        <p className="text-sm text-muted-foreground">Nada cadastrado ainda.</p>
      )}
    </div>
  )
}
