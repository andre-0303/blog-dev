import { requireUser } from "@/auth"
import { AdminNav } from "@/components/admin/admin-nav"

export const dynamic = "force-dynamic"

export const metadata = { title: "Admin · Blog Dev" }

export default async function AdminLayout({ children }: LayoutProps<"/admin">) {
  const user = await requireUser()

  return (
    <div className="flex flex-1 flex-col md:flex-row">
      <AdminNav name={user.name ?? "Autor"} email={user.email ?? ""} />
      <main className="min-w-0 flex-1 px-6 py-10">{children}</main>
    </div>
  )
}
