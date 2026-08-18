import { describe, expect, it } from "vitest";
import { getPrimarySeasonRole } from "../src/engine/career/get-primary-season-role";

describe("getPrimarySeasonRole", () => {
  it("deve retornar a função em que o jogador mais atuou", () => {
    const performance = {
      appearancesByRole: {
        ST: 24,
        CAM: 8,
        LW: 3,
      },
    };

    expect(getPrimarySeasonRole(performance)).toBe("ST");
  });

  it("deve funcionar quando o jogador atuou em apenas uma função", () => {
    const performance = {
      appearancesByRole: {
        CAM: 20,
      },
    };

    expect(getPrimarySeasonRole(performance)).toBe("CAM");
  });

  it("deve retornar null quando não houver aparições", () => {
    const performance = {
      appearancesByRole: {},
    };

    expect(getPrimarySeasonRole(performance)).toBeNull();
  });

  it("deve escolher a função com mais aparições", () => {
    const performance = {
      appearancesByRole: {
        CB: 10,
        CDM: 18,
        CM: 7,
      },
    };

    expect(getPrimarySeasonRole(performance)).toBe("CDM");
  });
});