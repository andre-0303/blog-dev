"use client"

import {
  FileText,
  FolderTree,
  LayoutDashboard,
  MessageSquare,
  PenLine,
  Tag,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { usePathname, useSearchParams } from "next/navigation"
import { logout } from "@/actions/auth"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarSeparator,
} from "@/components/ui/sidebar"
import { avatarTone, initials } from "@/lib/avatar"
import { cn } from "@/lib/utils"

const postFilters = [
  { href: "/admin/posts", label: "Todos" },
  { href: "/admin/posts?status=publicados", label: "Publicados" },
  { href: "/admin/posts?status=rascunhos", label: "Rascunhos" },
]

const organizacao = [
  { href: "/admin/categorias", label: "Categorias", icon: FolderTree },
  { href: "/admin/tags", label: "Tags", icon: Tag },
  { href: "/admin/comentarios", label: "Comentários", icon: MessageSquare },
]

export function AdminSidebar({ name, email }: { name: string; email: string }) {
  const pathname = usePathname()
  const status = useSearchParams().get("status") ?? ""
  const current = status ? `${pathname}?status=${status}` : pathname

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <Link
          href="/"
          className="flex items-center gap-2 px-2 py-1.5 group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:px-0"
          title="Voltar para o site"
        >
          <Image
            src="/logo-mark.png"
            alt=""
            width={289}
            height={206}
            className="h-5 w-auto shrink-0 group-data-[collapsible=icon]:h-4 dark:invert"
          />
          <span className="font-mono text-[0.65rem] tracking-widest text-muted-foreground uppercase group-data-[collapsible=icon]:hidden">
            admin
          </span>
        </Link>
      </SidebarHeader>

      <SidebarSeparator />

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton
                  isActive={current === "/admin"}
                  tooltip="Dashboard"
                  render={
                    <Link href="/admin">
                      <LayoutDashboard />
                      <span>Dashboard</span>
                    </Link>
                  }
                />
              </SidebarMenuItem>

              <SidebarMenuItem>
                <SidebarMenuButton
                  isActive={pathname === "/admin/posts"}
                  tooltip="Posts"
                  render={
                    <Link href="/admin/posts">
                      <FileText />
                      <span>Posts</span>
                    </Link>
                  }
                />
                <SidebarMenuSub>
                  {postFilters.map((filter) => (
                    <SidebarMenuSubItem key={filter.href}>
                      <SidebarMenuSubButton
                        isActive={current === filter.href}
                        render={
                          <Link href={filter.href}>
                            <span>{filter.label}</span>
                          </Link>
                        }
                      />
                    </SidebarMenuSubItem>
                  ))}
                </SidebarMenuSub>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <SidebarMenuButton
                  isActive={pathname === "/admin/posts/novo"}
                  tooltip="Novo post"
                  render={
                    <Link href="/admin/posts/novo">
                      <PenLine />
                      <span>Novo post</span>
                    </Link>
                  }
                />
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Organização</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {organizacao.map((item) => (
                <SidebarMenuItem key={item.href}>
                  <SidebarMenuButton
                    isActive={pathname === item.href}
                    tooltip={item.label}
                    render={
                      <Link href={item.href}>
                        <item.icon />
                        <span>{item.label}</span>
                      </Link>
                    }
                  />
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <SidebarSeparator />
        <div className="flex items-center gap-2 px-2 py-1.5">
          <Avatar size="sm">
            <AvatarFallback className={cn("font-medium", avatarTone(name))}>
              {initials(name)}
            </AvatarFallback>
          </Avatar>
          <div className="min-w-0 flex-1 group-data-[collapsible=icon]:hidden">
            <p className="truncate text-xs font-medium">{name}</p>
            <p className="truncate font-mono text-[0.65rem] text-muted-foreground">
              {email}
            </p>
          </div>
        </div>
        <form action={logout} className="group-data-[collapsible=icon]:hidden">
          <Button type="submit" variant="outline" size="sm" className="w-full">
            Sair
          </Button>
        </form>
      </SidebarFooter>
    </Sidebar>
  )
}
