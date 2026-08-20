import {
  Bot,
  Brain,
  ChartColumn,
  Construction,
  FlaskConical,
  Lightbulb,
  Microscope,
  Skull,
  Swords,
} from "lucide-react"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"

export const metadata = {
  title: "Sobre · Blog Dev",
  description:
    "Um laboratório público de desenvolvimento: projetos construídos do zero, experimentos, decisões de arquitetura e o que deu errado no caminho.",
}

const processo = [
  { nome: "Problema", nota: "Alguma coisa trava, quebra ou incomoda." },
  { nome: "Hipótese", nota: "Um palpite sobre a causa ou a saída." },
  { nome: "Implementação", nota: "Código escrito para testar o palpite." },
  { nome: "Experimentação", nota: "Roda, mede, compara." },
  { nome: "Problemas encontrados", nota: "O que a teoria não previa." },
  { nome: "Resultado", nota: "O que de fato aconteceu." },
  { nome: "Conclusão", nota: "O que eu faria diferente na próxima." },
]

const objetivos = [
  {
    titulo: "Documentar",
    texto:
      "Registrar decisões, experimentos e aprendizados enquanto o software é construído — não meses depois, quando o motivo já foi esquecido.",
  },
  {
    titulo: "Compartilhar",
    texto:
      "Transformar experiência prática em conteúdo que outra pessoa consiga aproveitar.",
  },
  {
    titulo: "Evoluir",
    texto:
      "Usar o próprio Blog Dev como projeto real para experimentar tecnologias, arquiteturas e práticas de engenharia.",
  },
]

const categorias = [
  { icone: Construction, nome: "Construindo", texto: "Projetos da ideia até a implementação" },
  { icone: FlaskConical, nome: "Laboratório", texto: "Experimentos com tecnologias e ferramentas" },
  { icone: Bot, nome: "IA na Prática", texto: "Inteligência artificial em problemas reais" },
  { icone: Swords, nome: "Batalha de Stack", texto: "Comparações entre tecnologias" },
  { icone: Skull, nome: "Deu Ruim", texto: "Bugs, decisões ruins e o que quebrou" },
  { icone: Lightbulb, nome: "Ideias", texto: "Produtos, SaaS e oportunidades" },
  { icone: Microscope, nome: "Por Dentro", texto: "Como as tecnologias funcionam por baixo" },
  { icone: ChartColumn, nome: "Vale a Pena?", texto: "Testes e avaliações práticas" },
  { icone: Brain, nome: "Aprendizados", texto: "O que ficou depois do projeto" },
]

const stack = [
  { grupo: "Interface", itens: ["Next.js", "React", "TypeScript", "Tailwind CSS", "shadcn/ui"] },
  { grupo: "Aplicação", itens: ["App Router", "Server Components", "Server Actions", "Zod"] },
  { grupo: "Dados", itens: ["PostgreSQL", "Neon", "Prisma ORM"] },
]

function SectionTitle({ children }: { children: string }) {
  return (
    <h2 className="font-display text-lg tracking-tight uppercase">{children}</h2>
  )
}

export default function SobrePage() {
  return (
    <main className="mx-auto w-full max-w-5xl px-6 py-16 sm:py-24">
      <div>
        <div>
          <h1 className="font-display text-[clamp(2.25rem,7vw,4.5rem)] leading-[0.95] font-extrabold tracking-[-0.035em] uppercase">
            Um laboratório
            <br />
            público
          </h1>
          <p className="mt-8 max-w-xl text-base/relaxed text-muted-foreground sm:text-lg/relaxed">
            O Blog Dev registra a construção de software enquanto ela acontece:
            projetos do zero, experimentos, decisões de arquitetura e os erros
            que vieram junto.
          </p>
        </div>
      </div>

      <section className="mt-20">
        <div>
          <div className="flex flex-col gap-8 sm:flex-row">
            <div className="flex-1">
              <p className="font-mono text-[0.7rem] tracking-widest text-muted-foreground uppercase">
                Não é isto
              </p>
              <p className="mt-3 font-display text-xl leading-snug tracking-tight text-muted-foreground line-through decoration-1">
                Como usar Next.js
              </p>
            </div>

            <div className="flex-1">
              <p className="font-mono text-[0.7rem] tracking-widest text-keyword uppercase">
                É isto
              </p>
              <p className="mt-3 font-display text-xl leading-snug tracking-tight">
                Construí uma aplicação com Next.js. Estas foram minhas decisões,
                os problemas que encontrei e o que eu faria diferente.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Separator className="mt-20" />

      <section className="mt-16">
        <SectionTitle>Como um artigo nasce</SectionTitle>

        <ol className="mt-8 border-t border-border">
          {processo.map((etapa, index) => (
            <li
              key={etapa.nome}
              className="flex flex-wrap items-baseline gap-x-4 gap-y-1 border-b border-border py-4 sm:gap-x-6"
            >
              <span
                aria-hidden="true"
                className="w-6 shrink-0 font-mono text-sm text-keyword"
              >
                {index + 1}.
              </span>
              <span className="font-display text-lg tracking-tight">{etapa.nome}</span>
              <span className="ml-auto max-w-xs text-sm text-muted-foreground sm:text-right">
                {etapa.nota}
              </span>
            </li>
          ))}
        </ol>

        <p className="mt-6 max-w-xl text-sm/relaxed text-muted-foreground">
          Menos teoria isolada, mais experimentação. Um artigo mostra o que
          fazer, por que fazer e o que acontece quando a solução encosta na
          realidade.
        </p>
      </section>

      <section className="mt-20">
        <SectionTitle>Três objetivos</SectionTitle>

        <dl className="mt-8 grid gap-px border border-border bg-border md:grid-cols-3">
          {objetivos.map((objetivo) => (
            <div key={objetivo.titulo} className="bg-background p-6">
              <dt className="font-display text-xl tracking-tight">{objetivo.titulo}</dt>
              <dd className="mt-3 text-sm/relaxed text-muted-foreground">
                {objetivo.texto}
              </dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="mt-20">
        <SectionTitle>O que aparece por aqui</SectionTitle>

        <ul className="mt-8 grid gap-x-8 gap-y-5 sm:grid-cols-2 lg:grid-cols-3">
          {categorias.map((categoria) => (
            <li key={categoria.nome} className="flex gap-3">
              <categoria.icone
                aria-hidden="true"
                strokeWidth={1.5}
                className="mt-0.5 size-5 shrink-0 text-keyword"
              />
              <div>
                <p className="font-medium">{categoria.nome}</p>
                <p className="mt-1 text-sm text-muted-foreground">{categoria.texto}</p>
              </div>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-20">
        <SectionTitle>Stack</SectionTitle>

        <div className="mt-8 flex flex-col gap-6">
          {stack.map((bloco) => (
            <div key={bloco.grupo} className="flex flex-col gap-3 sm:flex-row sm:gap-6">
              <p className="w-28 shrink-0 pt-1 font-mono text-[0.7rem] tracking-widest text-muted-foreground uppercase">
                {bloco.grupo}
              </p>
              <ul className="flex flex-wrap gap-2">
                {bloco.itens.map((item) => (
                  <li key={item}>
                    <Badge variant="outline" className="font-mono">
                      {item}
                    </Badge>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <p className="mt-6 text-sm/relaxed text-muted-foreground">
          O blog é escrito em Markdown e renderizado por React — a mesma pilha
          que os artigos discutem.
        </p>
      </section>

      <Separator className="mt-20" />

      <section className="mt-16">
        <div>
          <p className="font-display text-2xl leading-snug tracking-tight text-balance sm:text-3xl">
            Construir. Experimentar. Errar. Aprender. Documentar. Evoluir.
          </p>
          <p className="mt-6 text-sm text-muted-foreground">
            Escrito por <span className="text-foreground">André Bandeira</span>.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Button
              nativeButton={false}
              className="h-11 px-6 text-sm"
              render={<Link href="/blog">Ler os artigos</Link>}
            />
            <Button
              nativeButton={false}
              variant="outline"
              className="h-11 px-6 text-sm"
              render={<Link href="/categorias">Ver categorias</Link>}
            />
          </div>
        </div>
      </section>
    </main>
  )
}
