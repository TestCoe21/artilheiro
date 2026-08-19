import { describe, expect, it } from "vitest";

import { evaluatePlayingLevel } from "../src/engine/selection/evaluate-playing-level";

describe("evaluatePlayingLevel", () => {
  it("should consider the player a starter when clearly above the club level", () => {
    expect(evaluatePlayingLevel(80, 70)).toBe("starter");
  });

  it("should consider the player a starter in competition when slightly above the club level", () => {
    expect(evaluatePlayingLevel(75, 70)).toBe("starter_competition");
  });

  it("should consider the situation balanced when levels are very close", () => {
    expect(evaluatePlayingLevel(70, 70)).toBe("balanced");
  });

  it("should consider the player a reserve when below the club level", () => {
    expect(evaluatePlayingLevel(65, 70)).toBe("reserve");
  });

  it("should consider the player to have low opportunities when far below the club level", () => {
    expect(evaluatePlayingLevel(55, 70)).toBe("low_opportunity");
  });

  it("should consider a ten-point advantage a guaranteed starter level", () => {
    expect(evaluatePlayingLevel(80, 70)).toBe("starter");
  });

  it("should consider a ten-point disadvantage a low opportunity level", () => {
    expect(evaluatePlayingLevel(60, 70)).toBe("low_opportunity");
  });
});