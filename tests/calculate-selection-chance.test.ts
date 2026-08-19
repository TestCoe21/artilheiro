import { describe, expect, it } from "vitest";

import { calculateSelectionChance } from "../src/engine/selection/calculate-selection-chance";

describe("calculateSelectionChance", () => {
  it("should give a high chance to a player above the club level", () => {
    expect(
      calculateSelectionChance(80, 70, "first_division"),
    ).toBe(100);
  });

  it("should give a reasonable chance to a player close to the club level", () => {
    expect(
      calculateSelectionChance(70, 70, "first_division"),
    ).toBe(50);
  });

  it("should reduce the chance when the player is below the club level", () => {
    expect(
      calculateSelectionChance(60, 70, "first_division"),
    ).toBe(5);
  });

  it("should give more opportunities in regional competitions", () => {
    const regionalChance = calculateSelectionChance(
      60,
      70,
      "regional",
    );

    const nationalChance = calculateSelectionChance(
      60,
      70,
      "first_division",
    );

    expect(regionalChance).toBeGreaterThan(nationalChance);
  });

  it("should give more opportunities in state competitions", () => {
    const stateChance = calculateSelectionChance(
      60,
      70,
      "state",
    );

    const nationalChance = calculateSelectionChance(
      60,
      70,
      "first_division",
    );

    expect(stateChance).toBeGreaterThan(nationalChance);
  });

  it("should never go below five percent", () => {
    expect(
      calculateSelectionChance(30, 90, "first_division"),
    ).toBe(5);
  });

  it("should never exceed one hundred percent", () => {
    expect(
      calculateSelectionChance(100, 50, "state"),
    ).toBe(100);
  });
});