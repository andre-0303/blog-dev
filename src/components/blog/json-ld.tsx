/**
 * Dados estruturados para o Google. Renderizado no servidor, sem estado.
 * JSON.stringify escapa `<` e `&`, mas não `</script>`; o replace fecha isso.
 */
export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  )
}
