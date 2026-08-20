import type { Metadata } from "next";
import { Bricolage_Grotesque, Geist, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { site } from "@/lib/site";
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
  metadataBase: site.url,
  title: {
    default: site.title,
    // Cada página informa só o próprio nome; o sufixo entra aqui.
    template: `%s · ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  authors: [{ name: site.author }],
  creator: site.author,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: site.name,
    locale: site.locale,
    url: "/",
    title: site.title,
    description: site.description,
  },
  twitter: {
    card: "summary_large_image",
    title: site.title,
    description: site.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
  },
};

const themeScript = `
try {
  var escolha = localStorage.getItem("theme");
  var escuro = escolha === "dark" || (!escolha && matchMedia("(prefers-color-scheme: dark)").matches);
  if (escuro) document.documentElement.classList.add("dark");
} catch (e) {}
`

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="pt-BR"
      suppressHydrationWarning
      className={cn("h-full antialiased", display.variable, sans.variable, mono.variable)}
    >
      <head>
        {/* Roda antes da primeira pintura: sem isso a página aparece clara e
            pisca para o escuro depois que o React hidrata. */}
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
