import { cookies } from "next/headers"
import { requireUser } from "@/auth"
import { AdminSidebar } from "@/components/admin/admin-sidebar"
import { Separator } from "@/components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { TooltipProvider } from "@/components/ui/tooltip"

export const dynamic = "force-dynamic"

export const metadata = { title: "Admin · Blog Dev" }

export default async function AdminLayout({ children }: LayoutProps<"/admin">) {
  const user = await requireUser()

  // O SidebarProvider grava o estado num cookie no cliente. Lendo aqui, a barra
  // já sai renderizada recolhida — sem piscar aberta antes do JS assumir.
  const sidebarOpen = (await cookies()).get("sidebar_state")?.value !== "false"

  return (
    <TooltipProvider>
      <SidebarProvider defaultOpen={sidebarOpen}>
        <AdminSidebar name={user.name ?? "Autor"} email={user.email ?? ""} />

        <SidebarInset>
          <header className="flex h-14 shrink-0 items-center gap-2 border-b border-border px-4">
            <SidebarTrigger />
            <Separator orientation="vertical" className="h-4" />
            <span className="font-mono text-xs tracking-widest text-muted-foreground uppercase">
              painel
            </span>
          </header>

          <div className="min-w-0 flex-1 px-6 py-10">{children}</div>
        </SidebarInset>
      </SidebarProvider>
    </TooltipProvider>
  )
}
