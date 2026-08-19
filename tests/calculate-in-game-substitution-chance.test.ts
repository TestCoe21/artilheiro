import { describe, expect, it } from "vitest";

import { calculateInGameSubstitutionChance } from "../src/engine/selection/calculate-in-game-substitution-chance";

describe("calculateInGameSubstitutionChance", () => {
  it("should use the substitute chance before applying the minute modifier", () => {
    expect(
      calculateInGameSubstitutionChance(
        70,
        70,
        "first_division",
        0,
        40,
        40,
      ),
    ).toBe(82);
  });

  it("should increase the chance according to the match minute", () => {
    expect(
      calculateInGameSubstitutionChance(
        70,
        70,
        "first_division",
        0,
        40,
        45,
      ),
    ).toBe(100);
  });

  it("should never exceed 100%", () => {
    expect(
      calculateInGameSubstitutionChance(
        100,
        50,
        "state",
        0,
        45,
        45,
      ),
    ).toBe(100);
  });

  it("should keep the minimum chance at 20%", () => {
  expect(
    calculateInGameSubstitutionChance(
      0,
      100,
      "first_division",
      0,
      0,
      0,
    ),
  ).toBe(20);
});

  it("should be impossible to enter with 95 or more fatigue", () => {
    expect(
      calculateInGameSubstitutionChance(
        100,
        50,
        "state",
        95,
        80,
        80,
      ),
    ).toBe(0);
  });

  it("should apply the minute modifier at the end of the match", () => {
    expect(
      calculateInGameSubstitutionChance(
        70,
        70,
        "first_division",
        0,
        40,
        90,
      ),
    ).toBe(100);
  });
});