import { describe, expect, it } from "vitest";
import { createPotential } from "../src/engine/career/create-potential";

describe("createPotential", () => {
  it("deve gerar um potencial base entre 1 e 99", () => {
    const potential = createPotential();

    expect(potential.base).toBeGreaterThanOrEqual(1);
    expect(potential.base).toBeLessThanOrEqual(99);
  });

  it("deve gerar um teto entre 1 e 99", () => {
    const potential = createPotential();

    expect(potential.ceiling).toBeGreaterThanOrEqual(1);
    expect(potential.ceiling).toBeLessThanOrEqual(99);
  });

  it("o teto não deve ficar mais de 15 pontos distante da base", () => {
    const potential = createPotential();

    expect(
      Math.abs(potential.ceiling - potential.base)
    ).toBeLessThanOrEqual(15);
  });
});