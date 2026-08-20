import Link from "next/link"
import { Button } from "@/components/ui/button"

export const metadata = {
  title: "Página não encontrada",
  robots: { index: false, follow: false },
}

export default function NotFound() {
  return (
    <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col justify-center px-6 py-24">
      <p className="font-mono text-xs tracking-widest text-keyword uppercase">
        Erro 404
      </p>
      <h1 className="mt-4 font-display text-[clamp(2.5rem,8vw,4.5rem)] leading-[0.95] font-extrabold tracking-[-0.035em] uppercase">
        Essa página
        <br />
        não existe
      </h1>
      <p className="mt-6 max-w-md text-base/relaxed text-muted-foreground">
        O endereço pode estar errado, ou o artigo saiu do ar. Os que continuam
        publicados estão todos na listagem.
      </p>

      <div className="mt-10 flex flex-wrap gap-3">
        <Button
          nativeButton={false}
          className="h-11 px-6 text-sm"
          render={<Link href="/blog">Ver os artigos</Link>}
        />
        <Button
          nativeButton={false}
          variant="outline"
          className="h-11 px-6 text-sm"
          render={<Link href="/">Voltar ao início</Link>}
        />
      </div>
    </main>
  )
}
