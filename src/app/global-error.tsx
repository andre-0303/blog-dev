"use client"

/**
 * Última rede de proteção: só dispara quando o próprio layout raiz falha.
 * Por isso precisa trazer <html> e <body> — nada acima dele renderizou.
 * Sem acesso às fontes e ao CSS do app, os estilos vão inline.
 */
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <html lang="pt-BR">
      <body
        style={{
          margin: 0,
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "0 1.5rem",
          background: "#fafafa",
          color: "#0d0d0d",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <div style={{ maxWidth: "36rem", margin: "0 auto", width: "100%" }}>
          <p
            style={{
              margin: 0,
              fontSize: "0.75rem",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "#d6340f",
            }}
          >
            Erro grave
          </p>
          <h1 style={{ margin: "1rem 0 0", fontSize: "2.5rem", lineHeight: 1.05 }}>
            O site não carregou
          </h1>
          <p style={{ marginTop: "1.5rem", color: "#6b6b6b", lineHeight: 1.6 }}>
            Falhou algo na base da aplicação. Recarregar costuma resolver.
          </p>
          {error.digest && (
            <p style={{ marginTop: "1rem", fontSize: "0.8rem", color: "#6b6b6b" }}>
              Código: {error.digest}
            </p>
          )}
          <button
            onClick={reset}
            style={{
              marginTop: "2rem",
              padding: "0.75rem 1.5rem",
              background: "#0d0d0d",
              color: "#fafafa",
              border: 0,
              fontSize: "0.875rem",
              cursor: "pointer",
            }}
          >
            Tentar de novo
          </button>
        </div>
      </body>
    </html>
  )
}
