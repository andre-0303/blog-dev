import Link from "next/link";
import { PostList } from "@/components/blog/post-list";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { listPosts, toPostPreview } from "@/lib/posts";

export const dynamic = "force-dynamic";

export default async function Home() {
  const posts = (await listPosts()).slice(0, 3).map(toPostPreview);
  const latest = posts[0];

  return (
    <>
      <section className="mx-auto w-full max-w-5xl px-6 pt-16 pb-20 sm:pt-24 sm:pb-28">
        <div>
          <h1
            className="rise font-display text-[clamp(2.75rem,9vw,5.5rem)] leading-[0.9] font-extrabold tracking-[-0.035em] uppercase"
            style={{ animationDelay: "80ms" }}
          >
            Conteúdos sobre
            <br />
            tecnologia
          </h1>

          <p
            className="rise mt-8 max-w-xl text-base/relaxed text-muted-foreground sm:text-lg/relaxed"
            style={{ animationDelay: "200ms" }}
          >
            Código, conteúdo e conexão. Artigos práticos sobre desenvolvimento
            de software e web.
          </p>

          <div
            className="rise mt-10 flex flex-wrap gap-3"
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
        <div>
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

          <Separator className="mt-4" />
        </div>

        <div className="mt-6">
          {posts.length > 0 ? (
            <PostList posts={posts} />
          ) : (
            <div className="px-2 py-12">
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
