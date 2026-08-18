import { describe, expect, it } from "vitest";
import { getDevelopmentAttributes } from "../src/engine/career/get-development-attributes";

describe("getDevelopmentAttributes", () => {
  it("deve retornar atributos compatíveis com atacante", () => {
    const attributes = getDevelopmentAttributes("ST");

    expect(attributes).toContain("finishing");
    expect(attributes).toContain("positioning");
    expect(attributes).toContain("speed");
    expect(attributes).toContain("dribbling");

    expect(attributes).not.toContain("marking");
    expect(attributes).not.toContain("tackling");
  });

  it("deve retornar atributos compatíveis com meia", () => {
    const attributes = getDevelopmentAttributes("CM");

    expect(attributes).toContain("passing");
    expect(attributes).toContain("vision");
    expect(attributes).toContain("ballControl");
    expect(attributes).toContain("endurance");
  });

  it("deve retornar atributos compatíveis com zagueiro", () => {
    const attributes = getDevelopmentAttributes("CB");

    expect(attributes).toContain("tackling");
    expect(attributes).toContain("marking");
    expect(attributes).toContain("heading");
    expect(attributes).toContain("strength");

    expect(attributes).not.toContain("finishing");
  });

  it("deve retornar atributos compatíveis com goleiro", () => {
    const attributes = getDevelopmentAttributes("GK");

    expect(attributes).toContain("positioning");
    expect(attributes).toContain("vision");
    expect(attributes).toContain("emotionalControl");

    expect(attributes).not.toContain("finishing");
  });

  it("deve retornar uma lista vazia para uma função desconhecida", () => {
    expect(getDevelopmentAttributes("UNKNOWN")).toEqual([]);
  });
});