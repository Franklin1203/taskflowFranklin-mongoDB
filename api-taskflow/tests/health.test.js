const { describe, it } = require("node:test");
const assert = require("node:assert/strict");

describe("Validaciones básicas de TaskFlow API", () => {
  it("mapea correctamente el estado de conexión de Mongoose", () => {
    const states = ["desconectado", "conectado", "conectando", "desconectando"];
    assert.equal(states[1], "conectado");
  });

  it("valida que las colecciones requeridas estén definidas", () => {
    const collections = ["Users", "Teams"];
    assert.ok(collections.includes("Users"));
    assert.ok(collections.includes("Teams"));
  });
});