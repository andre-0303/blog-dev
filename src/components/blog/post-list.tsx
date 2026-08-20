import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import type { PostPreview } from "@/types/post"

const dateFormat = new Intl.DateTimeFormat("pt-BR", {
  day: "2-digit",
  month: "short",
  year: "numeric",
})

export function PostList({ posts }: { posts: PostPreview[] }) {
  return (
    <ul className="flex flex-col gap-4">
      {posts.map((post) => (
        <li
          key={post.slug}
          className="grid gap-x-6 md:grid-cols-[3rem_minmax(0,1fr)]"
        >
          <span
            aria-hidden="true"
            className="hidden pt-6 font-mono text-sm text-keyword md:block"
          >
            -
          </span>

          <Link
            href={`/blog/${post.slug}`}
            className="group block focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
          >
            <Card className="[--card-spacing:--spacing(6)] transition-colors group-hover:bg-muted/50 group-hover:ring-keyword">
              <CardHeader className="gap-3">
                <Badge
                  variant="outline"
                  className="font-mono tracking-widest text-muted-foreground uppercase"
                >
                  {post.category}
                </Badge>
                <CardTitle className="text-2xl leading-tight tracking-tight text-balance sm:text-3xl">
                  {post.title}
                </CardTitle>
                <CardDescription className="max-w-prose text-sm/relaxed">
                  {post.excerpt}
                </CardDescription>
              </CardHeader>

              <CardFooter className="justify-between font-mono text-xs text-muted-foreground">
                <span>{dateFormat.format(post.publishedAt)}</span>
                <span>{post.minutes} min de leitura</span>
              </CardFooter>
            </Card>
          </Link>
        </li>
      ))}
    </ul>
  )
}
