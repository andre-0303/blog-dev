import assert from "node:assert/strict"
import test from "node:test"
import { DUMMY_HASH, hashPassword, verifyPassword } from "./password"

test("aceita a senha correta", () => {
  const stored = hashPassword("senha-bem-comprida-123")
  assert.equal(verifyPassword("senha-bem-comprida-123", stored), true)
})

test("recusa a senha errada", () => {
  const stored = hashPassword("senha-bem-comprida-123")
  assert.equal(verifyPassword("senha-bem-comprida-124", stored), false)
  assert.equal(verifyPassword("", stored), false)
})

test("o mesmo texto gera hashes diferentes (salt por senha)", () => {
  assert.notEqual(hashPassword("igual"), hashPassword("igual"))
})

test("hash malformado não derruba nem passa", () => {
  for (const ruim of ["", "sem-dois-pontos", "aa:bb", ":", "aa:"]) {
    assert.equal(verifyPassword("qualquer", ruim), false)
  }
})

test("o hash descartável nunca casa", () => {
  assert.equal(verifyPassword("qualquer", DUMMY_HASH), false)
})
