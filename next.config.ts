import type { NextConfig } from "next";

/**
 * Cabeçalhos de segurança. Não há Content-Security-Policy aqui de propósito:
 * o script inline que aplica o tema antes da primeira pintura exigiria nonce
 * por requisição, o que obrigaria toda página a virar dinâmica e derrubaria o
 * cache estático. Vale revisitar se o site passar a aceitar conteúdo de fora.
 */
const securityHeaders = [
  // Sem enquadrar o site em iframe de terceiros (clickjacking).
  { key: "X-Frame-Options", value: "DENY" },
  // O navegador respeita o Content-Type declarado, sem adivinhar.
  { key: "X-Content-Type-Options", value: "nosniff" },
  // Envia só a origem ao navegar para fora — nunca o caminho completo.
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  // Nada aqui usa câmera, microfone ou localização.
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
  // HTTPS obrigatório por dois anos, subdomínios inclusos.
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
];

const nextConfig: NextConfig = {
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
};

export default nextConfig;
