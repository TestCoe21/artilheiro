import { describe, expect, it, vi } from "vitest";
import { selectDevelopmentAttributes } from "../src/engine/career/select-development-attributes";

describe("selectDevelopmentAttributes", () => {
  it("deve retornar todos os atributos quando houver até 4", () => {
    const attributes = [
      "finishing",
      "speed",
      "dribbling",
      "heading",
    ] as const;

    const result = selectDevelopmentAttributes([...attributes]);

    expect(result).toHaveLength(4);
    expect(result).toEqual(expect.arrayContaining(attributes));
  });

  it("deve selecionar no mínimo 2 atributos", () => {
    vi.spyOn(Math, "random").mockReturnValue(0);

    const attributes = [
      "finishing",
      "speed",
      "dribbling",
      "heading",
      "strength",
      "positioning",
    ] as const;

    const result = selectDevelopmentAttributes([...attributes]);

    expect(result.length).toBeGreaterThanOrEqual(2);

    vi.restoreAllMocks();
  });

  it("deve selecionar no máximo 4 atributos", () => {
    vi.spyOn(Math, "random").mockReturnValue(0.99);

    const attributes = [
      "finishing",
      "speed",
      "dribbling",
      "heading",
      "strength",
      "positioning",
      "passing",
    ] as const;

    const result = selectDevelopmentAttributes([...attributes]);

    expect(result.length).toBeLessThanOrEqual(4);

    vi.restoreAllMocks();
  });

  it("não deve selecionar o mesmo atributo mais de uma vez", () => {
    const attributes = [
      "finishing",
      "speed",
      "dribbling",
      "heading",
      "strength",
      "positioning",
    ] as const;

    const result = selectDevelopmentAttributes([...attributes]);

    expect(new Set(result).size).toBe(result.length);
  });

  it("não deve alterar a lista original", () => {
    const attributes = [
      "finishing",
      "speed",
      "dribbling",
      "heading",
      "strength",
    ] as const;

    const original = [...attributes];

    selectDevelopmentAttributes([...attributes]);

    expect(attributes).toEqual(original);
  });
});