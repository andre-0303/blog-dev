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
        <li key={post.slug}>
          <Link
            href={`/blog/${post.slug}`}
            className="group block focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
          >
            <Card className="[--card-spacing:--spacing(6)] transition-colors group-hover:bg-muted/50 group-hover:ring-keyword">
              <CardHeader className="gap-3">
                {post.category && (
                  <Badge
                    variant="outline"
                    className="font-mono tracking-widest text-muted-foreground uppercase"
                  >
                    {post.category}
                  </Badge>
                )}
                <CardTitle className="text-2xl leading-tight tracking-tight text-balance sm:text-3xl">
                  {post.title}
                </CardTitle>
                {post.excerpt && (
                  <CardDescription className="max-w-prose text-sm/relaxed">
                    {post.excerpt}
                  </CardDescription>
                )}
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
