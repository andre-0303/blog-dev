import assert from "node:assert/strict"
import test from "node:test"
import { postSchema } from "./post"

const valido = {
  title: "Um título aceitável",
  slug: "um-titulo-aceitavel",
  content: "c".repeat(50),
  published: false,
}

test("aceita um artigo no formato esperado", () => {
  assert.equal(postSchema.safeParse(valido).success, true)
})

test("recusa título curto e conteúdo curto", () => {
  assert.equal(postSchema.safeParse({ ...valido, title: "abc" }).success, false)
  assert.equal(postSchema.safeParse({ ...valido, content: "curto" }).success, false)
})

test("slug só aceita minúsculas, números e hífen entre palavras", () => {
  for (const ruim of ["Slug Com Espaco", "acentuação", "-comeca-com-hifen", "termina-", "dois--hifens"]) {
    assert.equal(postSchema.safeParse({ ...valido, slug: ruim }).success, false, ruim)
  }
  assert.equal(postSchema.safeParse({ ...valido, slug: "post-2026" }).success, true)
})

test("resumo é opcional mas tem teto de 300", () => {
  assert.equal(postSchema.safeParse({ ...valido, excerpt: undefined }).success, true)
  assert.equal(postSchema.safeParse({ ...valido, excerpt: "x".repeat(301) }).success, false)
})
