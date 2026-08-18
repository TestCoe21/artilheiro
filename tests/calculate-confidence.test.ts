import { describe, expect, it } from "vitest";
import { calculateConfidence } from "../src/engine/career/calculate-confidence";

describe("calculateConfidence", () => {
  it("deve aumentar a confiança em 15% por prêmio coletivo", () => {
    const result = {
      collectiveAwards: 1,
      individualAwards: 0,
      promoted: false,
      relegated: false,
    };

    expect(calculateConfidence(60, result)).toBe(75);
  });

  it("deve aumentar a confiança em 25% por prêmio individual", () => {
    const result = {
      collectiveAwards: 0,
      individualAwards: 1,
      promoted: false,
      relegated: false,
    };

    expect(calculateConfidence(60, result)).toBe(85);
  });

  it("deve aumentar a confiança em 50% ao subir de divisão", () => {
    const result = {
      collectiveAwards: 0,
      individualAwards: 0,
      promoted: true,
      relegated: false,
    };

    expect(calculateConfidence(60, result)).toBe(100);
  });

  it("deve reduzir a confiança em 50% ao ser rebaixado", () => {
    const result = {
      collectiveAwards: 0,
      individualAwards: 0,
      promoted: false,
      relegated: true,
    };

    expect(calculateConfidence(60, result)).toBe(10);
  });

  it("não deve ultrapassar 100", () => {
    const result = {
      collectiveAwards: 2,
      individualAwards: 2,
      promoted: true,
      relegated: false,
    };

    expect(calculateConfidence(90, result)).toBe(100);
  });

  it("não deve ficar abaixo de 0", () => {
    const result = {
      collectiveAwards: 0,
      individualAwards: 0,
      promoted: false,
      relegated: true,
    };

    expect(calculateConfidence(0, result)).toBe(0);
  });
});