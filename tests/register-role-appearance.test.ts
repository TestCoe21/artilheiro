import { describe, expect, it } from "vitest";
import { registerRoleAppearance } from "../src/engine/career/register-role-appearance";

describe("registerRoleAppearance", () => {
  it("deve registrar a primeira aparição em uma função", () => {
    const performance = {
      appearancesByRole: {},
    };

    const result = registerRoleAppearance(performance, "ST");

    expect(result.appearancesByRole.ST).toBe(1);
  });

  it("deve incrementar as aparições de uma função existente", () => {
    const performance = {
      appearancesByRole: {
        ST: 10,
      },
    };

    const result = registerRoleAppearance(performance, "ST");

    expect(result.appearancesByRole.ST).toBe(11);
  });

  it("não deve alterar outras funções", () => {
    const performance = {
      appearancesByRole: {
        ST: 10,
        CAM: 5,
      },
    };

    const result = registerRoleAppearance(performance, "ST");

    expect(result.appearancesByRole.CAM).toBe(5);
  });

  it("não deve alterar a performance original", () => {
    const performance = {
      appearancesByRole: {
        ST: 10,
      },
    };

    registerRoleAppearance(performance, "ST");

    expect(performance.appearancesByRole.ST).toBe(10);
  });
});