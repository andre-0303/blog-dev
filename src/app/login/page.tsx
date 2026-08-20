import Image from "next/image"
import { redirect } from "next/navigation"
import { auth } from "@/auth"
import { LoginForm } from "@/components/admin/login-form"

export const dynamic = "force-dynamic"

export const metadata = {
  title: "Entrar",
  robots: { index: false, follow: false },
}

export default async function LoginPage() {
  if (await auth()) redirect("/admin")

  return (
    <main className="flex flex-1 items-center justify-center px-6 py-16">
      <div className="w-full max-w-sm">
        <Image
          src="/logo-mark.png"
          alt="Blog Dev"
          width={289}
          height={206}
          className="h-9 w-auto dark:invert"
        />

        <h1 className="mt-8 font-display text-3xl tracking-tight uppercase">
          Área administrativa
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Entre para escrever e publicar artigos.
        </p>

        <div className="mt-8">
          <LoginForm />
        </div>
      </div>
    </main>
  )
}
