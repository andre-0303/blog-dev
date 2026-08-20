"use client"

import { useEffect } from "react"
import { Button } from "@/components/ui/button"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Em produção o Next só entrega o digest ao cliente; a mensagem real fica
    // no log do servidor. Registrar aqui liga um ao outro na hora de investigar.
    console.error("Erro na página:", error.digest ?? error.message)
  }, [error])

  return (
    <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col justify-center px-6 py-24">
      <p className="font-mono text-xs tracking-widest text-keyword uppercase">
        Algo quebrou
      </p>
      <h1 className="mt-4 font-display text-[clamp(2rem,6vw,3.5rem)] leading-[1] font-extrabold tracking-[-0.03em] uppercase">
        Não consegui
        <br />
        carregar isto
      </h1>
      <p className="mt-6 max-w-md text-base/relaxed text-muted-foreground">
        O erro foi registrado. Tentar de novo costuma resolver quando o banco
        estava apenas acordando.
      </p>

      {error.digest && (
        <p className="mt-4 font-mono text-xs text-muted-foreground">
          Código: {error.digest}
        </p>
      )}

      <div className="mt-10 flex flex-wrap gap-3">
        <Button onClick={reset} className="h-11 px-6 text-sm">
          Tentar de novo
        </Button>
      </div>
    </main>
  )
}
