import { ImageResponse } from "next/og"
import { site } from "@/lib/site"

export const alt = site.title
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

export default function Image() {
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
        <div style={{ width: 64, height: 10, background: "#d6340f" }} />

        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div
            style={{
              display: "flex",
              fontSize: 96,
              fontWeight: 700,
              letterSpacing: -3,
              color: "#0d0d0d",
            }}
          >
            {site.name}
          </div>
          <div style={{ display: "flex", fontSize: 32, color: "#6b6b6b", maxWidth: 900 }}>
            Código, conteúdo e conexão. Tecnologia vista através da prática.
          </div>
        </div>

        <div style={{ display: "flex", fontSize: 26, color: "#6b6b6b" }}>
          {site.url.host}
        </div>
      </div>
    ),
    size
  )
}
