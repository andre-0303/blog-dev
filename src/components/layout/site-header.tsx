import Image from "next/image"
import Link from "next/link"
import { ThemeToggle } from "@/components/layout/theme-toggle"

const nav = [
  { href: "/blog", label: "blog" },
  { href: "/categorias", label: "categorias" },
  { href: "/sobre", label: "sobre" },
]

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/85 backdrop-blur-sm">
      <div className="mx-auto flex w-full max-w-5xl items-center justify-between gap-4 px-6 py-3">
        <Link
          href="/"
          className="focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
        >
          <Image
            src="/logo-mark.png"
            alt="Blog Dev — página inicial"
            width={289}
            height={206}
            loading="eager"
            className="h-7 w-auto dark:invert"
          />
        </Link>

        <div className="flex items-center gap-2 sm:gap-4">
          <nav aria-label="Principal">
            <ul className="flex items-center gap-1 font-mono text-xs tracking-widest uppercase">
              {nav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="block px-2 py-2 text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring sm:px-3"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <ThemeToggle />
        </div>
      </div>
    </header>
  )
}
