import Link from "next/link";
import { PostList } from "@/components/blog/post-list";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import type { PostPreview } from "@/types/post";

// Mock enquanto o banco está vazio.
// Para ligar no banco: `const posts = await listPosts()` e torne o componente async.
const posts: PostPreview[] = [
  {
    slug: "construindo-apis-com-nextjs",
    title: "Construindo APIs com Next.js",
    excerpt:
      "Route handlers, validação de entrada e tratamento de erro em uma API que você não vai ter vergonha de manter daqui a seis meses.",
    category: "Next.js",
    minutes: 8,
    publishedAt: new Date(2026, 7, 14),
  },
  {
    slug: "introducao-ao-react",
    title: "Introdução ao React",
    excerpt:
      "Componentes, estado e o ciclo de renderização — os três conceitos que explicam quase tudo que o React faz.",
    category: "React",
    minutes: 6,
    publishedAt: new Date(2026, 7, 2),
  },
  {
    slug: "desenvolvimento-web-com-typescript",
    title: "Desenvolvimento web com TypeScript",
    excerpt:
      "Tipagem que ajuda em vez de atrapalhar: inferência, tipos utilitários e onde vale a pena anotar na mão.",
    category: "TypeScript",
    minutes: 11,
    publishedAt: new Date(2026, 6, 21),
  },
];

export default function Home() {
  const latest = posts[0];

  return (
    <>
      <section className="mx-auto w-full max-w-5xl px-6 pt-16 pb-20 sm:pt-24 sm:pb-28">
        <div className="grid gap-x-6 md:grid-cols-[3rem_minmax(0,1fr)]">
          <span
            aria-hidden="true"
            className="rise hidden pt-3 font-mono text-2xl text-keyword md:block"
          >
            #
          </span>
          <h1
            className="rise font-display text-[clamp(2.75rem,9vw,5.5rem)] leading-[0.9] font-extrabold tracking-[-0.035em] uppercase"
            style={{ animationDelay: "80ms" }}
          >
            Conteúdos sobre
            <br />
            tecnologia
          </h1>

          <span
            aria-hidden="true"
            className="rise mt-8 hidden font-mono text-sm text-keyword md:block"
            style={{ animationDelay: "160ms" }}
          >
            &gt;
          </span>
          <p
            className="rise mt-8 max-w-xl text-base/relaxed text-muted-foreground sm:text-lg/relaxed"
            style={{ animationDelay: "200ms" }}
          >
            Código, conteúdo e conexão. Artigos práticos sobre desenvolvimento
            de software e web.
          </p>

          <div
            className="rise mt-10 flex flex-wrap gap-3 md:col-start-2"
            style={{ animationDelay: "300ms" }}
          >
            <Button
              nativeButton={false}
              className="h-11 px-6 text-sm"
              render={
                <Link href={latest ? `/blog/${latest.slug}` : "/blog"}>
                  Ler o último artigo
                </Link>
              }
            />
            <Button
              nativeButton={false}
              variant="outline"
              className="h-11 px-6 text-sm"
              render={<Link href="/blog">Ver todos os artigos</Link>}
            />
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-5xl px-6 pb-24">
        <div className="grid gap-x-6 md:grid-cols-[3rem_minmax(0,1fr)]">
          <span
            aria-hidden="true"
            className="hidden font-mono text-sm text-keyword md:block"
          >
            ##
          </span>
          <div className="flex items-baseline justify-between gap-4">
            <h2 className="font-display text-lg tracking-tight uppercase">
              Artigos em destaque
            </h2>
            <Link
              href="/blog"
              className="font-mono text-xs tracking-widest text-muted-foreground uppercase transition-colors hover:text-foreground"
            >
              ver todos
            </Link>
          </div>

          <Separator className="mt-4 md:col-start-2" />
        </div>

        <div className="mt-6">
          {posts.length > 0 ? (
            <PostList posts={posts} />
          ) : (
            <div className="px-2 py-12 md:ml-18">
              <p className="text-sm text-muted-foreground">
                Nenhum artigo publicado ainda.
              </p>
              <Link
                href="/admin/posts/novo"
                className="mt-4 inline-block font-mono text-xs tracking-widest text-keyword uppercase underline-offset-4 hover:underline"
              >
                Publicar o primeiro
              </Link>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
