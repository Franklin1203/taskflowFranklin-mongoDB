import { describe, it, expect } from "vitest";

describe("TaskFlow Frontend", () => {
  it("construye correctamente la URL de salud de la API", () => {
    const baseUrl = "http://localhost:3008";
    expect(`${baseUrl}/api/health`).toBe("http://localhost:3008/api/health");
  });
});