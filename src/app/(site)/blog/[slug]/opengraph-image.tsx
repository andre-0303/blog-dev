import { ImageResponse } from "next/og"
import { getPost } from "@/lib/posts"
import { site } from "@/lib/site"

export const alt = "Artigo do Blog Dev"
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = await getPost(slug)

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#fafafa",
          padding: 80,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div style={{ width: 40, height: 8, background: "#d6340f" }} />
          <div
            style={{
              fontSize: 22,
              letterSpacing: 6,
              textTransform: "uppercase",
              color: "#6b6b6b",
            }}
          >
            {post?.category?.name ?? site.name}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            fontSize: post && post.title.length > 60 ? 64 : 84,
            fontWeight: 700,
            lineHeight: 1.05,
            letterSpacing: -2,
            color: "#0d0d0d",
          }}
        >
          {post?.title ?? site.name}
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: 26,
            color: "#6b6b6b",
          }}
        >
          <span>{post?.author.name ?? site.author}</span>
          <span>{site.url.host}</span>
        </div>
      </div>
    ),
    size
  )
}
