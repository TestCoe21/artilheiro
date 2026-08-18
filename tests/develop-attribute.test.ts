import { describe, expect, it } from "vitest";
import { developAttribute } from "../src/engine/career/develop-attribute";

describe("developAttribute", () => {
  it("deve aumentar o atributo pelo valor de desenvolvimento", () => {
    expect(developAttribute(50, 80, 5)).toBe(55);
  });

  it("não deve ultrapassar o teto de evolução", () => {
    expect(developAttribute(78, 80, 5)).toBe(80);
  });

  it("não deve ultrapassar 99", () => {
    expect(developAttribute(95, 99, 10)).toBe(99);
  });

  it("deve retornar o mesmo valor quando o desenvolvimento for zero", () => {
    expect(developAttribute(70, 80, 0)).toBe(70);
  });
});