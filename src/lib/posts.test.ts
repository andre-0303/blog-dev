import assert from "node:assert/strict"
import test from "node:test"
import { readingMinutes } from "./posts"

test("arredonda para cima e nunca devolve zero", () => {
  assert.equal(readingMinutes(""), 1)
  assert.equal(readingMinutes("uma palavra"), 1)
  assert.equal(readingMinutes("palavra ".repeat(200)), 1)
  assert.equal(readingMinutes("palavra ".repeat(201)), 2)
})

test("espaço extra e quebra de linha não contam como palavra", () => {
  assert.equal(readingMinutes("  \n\n  duas   palavras \n "), 1)
})
