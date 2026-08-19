import { describe, expect, it } from "vitest";

import { selectForMatch } from "../src/engine/selection/select-for-match";

describe("selectForMatch", () => {
  it("should select the player when the random value is below the chance", () => {
    const result = selectForMatch(
      75,
      70,
      "first_division",
      0.1,
    );

    expect(result).toBe(true);
  });

  it("should not select the player when the random value is above the chance", () => {
    const result = selectForMatch(
      70,
      70,
      "first_division",
      0.9,
    );

    expect(result).toBe(false);
  });

  it("should select a player with a guaranteed chance", () => {
    const result = selectForMatch(
      90,
      70,
      "first_division",
      0.99,
    );

    expect(result).toBe(true);
  });

  it("should still give weaker players a chance in state competitions", () => {
    const result = selectForMatch(
      60,
      70,
      "state",
      0.2,
    );

    expect(result).toBe(true);
  });
});