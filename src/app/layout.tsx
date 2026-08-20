import type { Metadata } from "next";
import { Bricolage_Grotesque, Geist, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const display = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-bricolage",
});

const sans = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: "Blog Dev",
  description: "Código, conteúdo e conexão. Artigos sobre desenvolvimento, software e web.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="pt-BR"
      className={cn("h-full antialiased", display.variable, sans.variable, mono.variable)}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
