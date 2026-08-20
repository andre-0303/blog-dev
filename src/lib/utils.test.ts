import assert from "node:assert/strict"
import test from "node:test"
import { slugify } from "./utils"

test("gera slug legível a partir do título", () => {
  assert.equal(slugify("Como aprender Next.js em 2026"), "como-aprender-next-js-em-2026")
})

test("remove acentos e cedilha", () => {
  assert.equal(slugify("Introdução à Programação"), "introducao-a-programacao")
  assert.equal(slugify("Ação e Coração"), "acao-e-coracao")
})

test("não deixa hífen sobrando nas pontas nem repetido", () => {
  assert.equal(slugify("  --- Olá   mundo!!! ---  "), "ola-mundo")
})

test("respeita o limite de 150 caracteres do schema", () => {
  assert.ok(slugify("palavra ".repeat(60)).length <= 150)
})

test("texto sem letras vira string vazia, e o Zod barra depois", () => {
  assert.equal(slugify("!!!"), "")
})
