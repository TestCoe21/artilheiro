import { describe, expect, it, vi } from "vitest";
import {
  getDevelopmentLimit,
  calculateAttributeDevelopment,
} from "../src/engine/career/calculate-attribute-development";

describe("getDevelopmentLimit", () => {
  it("deve permitir até 4 pontos dos 16 aos 19 anos", () => {
    expect(getDevelopmentLimit(16)).toBe(4);
    expect(getDevelopmentLimit(19)).toBe(4);
  });

  it("deve permitir até 3 pontos dos 20 aos 23 anos", () => {
    expect(getDevelopmentLimit(20)).toBe(3);
    expect(getDevelopmentLimit(23)).toBe(3);
  });

  it("deve permitir até 2 pontos dos 24 aos 27 anos", () => {
    expect(getDevelopmentLimit(24)).toBe(2);
    expect(getDevelopmentLimit(27)).toBe(2);
  });

  it("deve permitir até 1 ponto dos 28 aos 31 anos", () => {
    expect(getDevelopmentLimit(28)).toBe(1);
    expect(getDevelopmentLimit(31)).toBe(1);
  });

  it("deve permitir até meio ponto a partir dos 32 anos", () => {
    expect(getDevelopmentLimit(32)).toBe(0.5);
    expect(getDevelopmentLimit(40)).toBe(0.5);
  });
});

describe("calculateAttributeDevelopment", () => {
  it("deve retornar um valor inteiro entre 0 e 4 aos 19 anos", () => {
    vi.spyOn(Math, "random").mockReturnValue(0.9);

    expect(calculateAttributeDevelopment(19)).toBe(4);

    vi.restoreAllMocks();
  });

  it("deve retornar um valor inteiro entre 0 e 3 aos 23 anos", () => {
    vi.spyOn(Math, "random").mockReturnValue(0.9);

    expect(calculateAttributeDevelopment(23)).toBe(3);

    vi.restoreAllMocks();
  });

  it("deve retornar um valor inteiro entre 0 e 2 aos 27 anos", () => {
    vi.spyOn(Math, "random").mockReturnValue(0.9);

    expect(calculateAttributeDevelopment(27)).toBe(2);

    vi.restoreAllMocks();
  });

  it("deve retornar um valor inteiro entre 0 e 1 aos 31 anos", () => {
    vi.spyOn(Math, "random").mockReturnValue(0.9);

    expect(calculateAttributeDevelopment(31)).toBe(1);

    vi.restoreAllMocks();
  });

  it("deve retornar 0 ou 0.5 a partir dos 32 anos", () => {
    const random = vi.spyOn(Math, "random");

    random.mockReturnValueOnce(0.2);
    expect(calculateAttributeDevelopment(32)).toBe(0);

    random.mockReturnValueOnce(0.8);
    expect(calculateAttributeDevelopment(32)).toBe(0.5);

    vi.restoreAllMocks();
  });
});