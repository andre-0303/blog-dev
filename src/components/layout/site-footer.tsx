import Image from "next/image"
import Link from "next/link"

export function SiteFooter() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-8 px-6 py-12 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <Image
            src="/logo-lockup.png"
            alt="Blog Dev"
            width={449}
            height={326}
            className="h-14 w-auto dark:invert"
          />
        </div>

        <div className="flex flex-col gap-3 font-mono text-xs tracking-widest uppercase sm:items-end">
          <Link
            href="/blog"
            className="text-muted-foreground transition-colors hover:text-foreground"
          >
            todos os artigos
          </Link>
          <Link
            href="/sobre"
            className="text-muted-foreground transition-colors hover:text-foreground"
          >
            sobre o blog
          </Link>
          <span className="text-muted-foreground/70 normal-case tracking-normal">
            © {new Date().getFullYear()} Blog Dev
          </span>
        </div>
      </div>
    </footer>
  )
}
