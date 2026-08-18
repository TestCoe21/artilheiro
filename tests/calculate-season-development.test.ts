import { describe, expect, it } from "vitest";
import { calculateSeasonDevelopment } from "../src/engine/career/calculate-season-development";

describe("calculateSeasonDevelopment", () => {
  it("deve permitir até 4 pontos em uma temporada excelente", () => {
    expect(calculateSeasonDevelopment(4)).toBe(4);
  });

  it("deve permitir até 3 pontos em uma temporada boa", () => {
    expect(calculateSeasonDevelopment(3)).toBe(3);
  });

  it("deve permitir até 2 pontos em uma temporada normal", () => {
    expect(calculateSeasonDevelopment(2)).toBe(2);
  });

  it("deve permitir até 1 ponto em uma temporada fraca", () => {
    expect(calculateSeasonDevelopment(1)).toBe(1);
  });

  it("deve permitir 0 pontos quando não houver desenvolvimento", () => {
    expect(calculateSeasonDevelopment(0)).toBe(0);
  });
});