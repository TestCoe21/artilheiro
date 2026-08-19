import { describe, expect, it } from "vitest";

import { selectSubstitute } from "../src/engine/selection/select-substitute";

describe("selectSubstitute", () => {
  it("should select the player when the random value is below the chance", () => {
    const result = selectSubstitute(
      75,
      70,
      "first_division",
      0,
      40,
      0.50,
    );

    expect(result).toBe(true);
  });

  it("should not select the player when the random value is above the chance", () => {
    const result = selectSubstitute(
      75,
      70,
      "first_division",
      0,
      40,
      0.90,
    );

    expect(result).toBe(false);
  });

  it("should select a player with a guaranteed chance", () => {
    const result = selectSubstitute(
      100,
      50,
      "state",
      0,
      100,
      0.99,
    );

    expect(result).toBe(true);
  });

  it("should give weaker players a chance in state competitions", () => {
    const result = selectSubstitute(
      60,
      70,
      "state",
      0,
      40,
      0.49,
    );

    expect(result).toBe(true);
  });

  it("should not select a player with 95 or more fatigue", () => {
    const result = selectSubstitute(
      100,
      50,
      "state",
      95,
      100,
      0,
    );

    expect(result).toBe(false);
  });

  it("should use the same random value consistently around the probability boundary", () => {
    const selected = selectSubstitute(
      70,
      70,
      "first_division",
      0,
      40,
      0.79,
    );

    const notSelected = selectSubstitute(
      70,
      70,
      "first_division",
      0,
      40,
      0.80,
    );

    expect(selected).toBe(true);
    expect(notSelected).toBe(false);
  });
});