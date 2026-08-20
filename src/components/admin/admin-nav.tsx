"use client"

import Image from "next/image"
import Link from "next/link"
import { usePathname, useSearchParams } from "next/navigation"
import { logout } from "@/actions/auth"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"

type Item = { href: string; label: string }

const groups: { title: string; items: Item[] }[] = [
  { title: "", items: [{ href: "/admin", label: "Dashboard" }] },
  {
    title: "Posts",
    items: [
      { href: "/admin/posts", label: "Todos" },
      { href: "/admin/posts?status=publicados", label: "Publicados" },
      { href: "/admin/posts?status=rascunhos", label: "Rascunhos" },
      { href: "/admin/posts/novo", label: "Novo post" },
    ],
  },
  {
    title: "Organização",
    items: [
      { href: "/admin/categorias", label: "Categorias" },
      { href: "/admin/tags", label: "Tags" },
      { href: "/admin/comentarios", label: "Comentários" },
    ],
  },
]

export function AdminNav({ name, email }: { name: string; email: string }) {
  const pathname = usePathname()
  const status = useSearchParams().get("status") ?? ""
  const current = status ? `${pathname}?status=${status}` : pathname

  return (
    <nav
      aria-label="Administração"
      className="flex shrink-0 flex-col gap-6 border-b border-border px-6 py-6 md:w-60 md:border-r md:border-b-0"
    >
      <Link href="/" className="flex items-center gap-2">
        <Image
          src="/logo-mark.png"
          alt="Blog Dev"
          width={289}
          height={206}
          className="h-6 w-auto dark:invert"
        />
        <span className="font-mono text-[0.65rem] tracking-widest text-muted-foreground uppercase">
          admin
        </span>
      </Link>

      <div className="flex flex-col gap-5">
        {groups.map((group) => (
          <div key={group.title} className="flex flex-col gap-1">
            {group.title && (
              <p className="px-2 pb-1 font-mono text-[0.65rem] tracking-widest text-muted-foreground uppercase">
                {group.title}
              </p>
            )}
            {group.items.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                aria-current={current === item.href ? "page" : undefined}
                className={cn(
                  "px-2 py-1.5 text-sm transition-colors",
                  current === item.href
                    ? "bg-muted font-medium text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {item.label}
              </Link>
            ))}
          </div>
        ))}
      </div>

      <Separator className="mt-auto" />

      <div className="flex flex-col gap-2">
        <p className="text-sm font-medium">{name}</p>
        <p className="font-mono text-xs break-all text-muted-foreground">{email}</p>
        <form action={logout}>
          <Button type="submit" variant="outline" size="sm" className="mt-1 w-full">
            Sair
          </Button>
        </form>
      </div>
    </nav>
  )
}
