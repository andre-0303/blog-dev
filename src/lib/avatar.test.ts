import assert from "node:assert/strict"
import test from "node:test"
import { avatarTone, initials } from "./avatar"

test("iniciais usam o primeiro e o último nome", () => {
  assert.equal(initials("André Bandeira"), "AB")
  assert.equal(initials("ana clara souza"), "AS")
  assert.equal(initials("maria"), "M")
})

test("iniciais ignoram espaço sobrando e nome vazio", () => {
  assert.equal(initials("  joão  "), "J")
  assert.equal(initials("   "), "?")
  assert.equal(initials(""), "?")
})

test("o tom depende do nome, não do jeito de escrevê-lo", () => {
  assert.equal(avatarTone("André Bandeira"), avatarTone(" andré bandeira "))
  assert.equal(avatarTone("maria"), avatarTone("MARIA"))
})

test("nomes diferentes se espalham pelos tons", () => {
  // Com poucos tons a colisão entre dois nomes é normal; o que não pode é
  // todo mundo cair no mesmo.
  const nomes = ["Ana", "Bruno", "Carla", "Diego", "Elisa", "Fábio", "Gabi", "Hugo"]
  const tons = new Set(nomes.map(avatarTone))
  assert.ok(tons.size >= 3, `esperava variedade, veio ${tons.size} tom(ns)`)
})

test("o tom é sempre uma classe utilizável", () => {
  for (const nome of ["a", "Zoe", "Nome Bem Grande Aqui", "123"]) {
    assert.match(avatarTone(nome), /^bg-/)
  }
})
