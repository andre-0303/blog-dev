"use client"

import { Moon, Sun } from "lucide-react"
import { useSyncExternalStore } from "react"
import { Switch } from "@/components/ui/switch"

export const THEME_KEY = "theme"

/** Observa a classe do <html>: quem manda no tema é o DOM, não o React. */
function subscribe(onChange: () => void) {
  const observer = new MutationObserver(onChange)
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["class"],
  })
  return () => observer.disconnect()
}

export function ThemeToggle() {
  const isDark = useSyncExternalStore(
    subscribe,
    () => document.documentElement.classList.contains("dark"),
    // No servidor não dá para saber o tema. O script inline do layout corrige
    // antes da primeira pintura, então o palpite aqui nunca aparece.
    () => false
  )

  function setDark(dark: boolean) {
    document.documentElement.classList.toggle("dark", dark)
    try {
      localStorage.setItem(THEME_KEY, dark ? "dark" : "light")
    } catch {
      // Navegação privada pode bloquear o storage: o tema vale só nesta aba.
    }
  }

  return (
    <div className="flex items-center gap-2">
      <Sun aria-hidden="true" className="size-3.5 text-muted-foreground" />
      <Switch
        checked={isDark}
        onCheckedChange={setDark}
        aria-label={isDark ? "Mudar para o modo claro" : "Mudar para o modo escuro"}
      />
      <Moon aria-hidden="true" className="size-3.5 text-muted-foreground" />
    </div>
  )
}
