"use client"

import { useEffect } from "react"
import { Button } from "@/components/ui/button"

export default function AdminError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error("Erro no admin:", error.digest ?? error.message)
  }, [error])

  return (
    <div className="flex flex-col gap-6">
      <div>
        <p className="font-mono text-xs tracking-widest text-keyword uppercase">
          Algo quebrou
        </p>
        <h1 className="mt-3 font-display text-3xl tracking-tight uppercase">
          Esta tela não carregou
        </h1>
        <p className="mt-3 max-w-md text-sm text-muted-foreground">
          Nenhum dado foi perdido. Se o banco estava acordando, tentar de novo
          resolve.
        </p>
        {error.digest && (
          <p className="mt-3 font-mono text-xs text-muted-foreground">
            Código: {error.digest}
          </p>
        )}
      </div>

      <div>
        <Button onClick={reset} className="h-10 px-5 text-sm">
          Tentar de novo
        </Button>
      </div>
    </div>
  )
}
