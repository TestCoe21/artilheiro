import { describe, expect, it } from "vitest";

import { calculateSubstituteEntryChance } from "../src/engine/match/calculate-substitute-entry-chance";

describe("calculateSubstituteEntryChance", () => {
  it("should give a basic chance at the beginning of the second half", () => {
    expect(
      calculateSubstituteEntryChance(70, 70, 45, 0, 40),
    ).toBe(25);
  });

  it("should increase the chance as the match progresses", () => {
    const early = calculateSubstituteEntryChance(
      70,
      70,
      50,
      0,
      40,
    );

    const late = calculateSubstituteEntryChance(
      70,
      70,
      75,
      0,
      40,
    );

    expect(late).toBeGreaterThan(early);
  });

  it("should give a stronger player a better chance to enter", () => {
    const stronger = calculateSubstituteEntryChance(
      80,
      70,
      60,
      0,
      40,
    );

    const weaker = calculateSubstituteEntryChance(
      65,
      70,
      60,
      0,
      40,
    );

    expect(stronger).toBeGreaterThan(weaker);
  });

  it("should improve the chance with a good coach relationship", () => {
    const goodRelationship = calculateSubstituteEntryChance(
      70,
      70,
      60,
      0,
      80,
    );

    const badRelationship = calculateSubstituteEntryChance(
      70,
      70,
      60,
      0,
      20,
    );

    expect(goodRelationship).toBeGreaterThan(badRelationship);
  });

  it("should increase the chance when the player has moderate fatigue", () => {
    const rested = calculateSubstituteEntryChance(
      70,
      70,
      60,
      0,
      40,
    );

    const tired = calculateSubstituteEntryChance(
      70,
      70,
      60,
      70,
      40,
    );

    expect(tired).toBeGreaterThan(rested);
  });

  it("should be impossible to enter with 95 or more fatigue", () => {
    expect(
      calculateSubstituteEntryChance(100, 50, 75, 95, 100),
    ).toBe(0);
  });

  it("should be impossible to enter before halftime", () => {
    expect(
      calculateSubstituteEntryChance(100, 50, 44, 0, 100),
    ).toBe(0);
  });

  it("should never exceed 95%", () => {
    expect(
      calculateSubstituteEntryChance(100, 50, 90, 85, 100),
    ).toBe(95);
  });

  it("should never go below 5% when the player is eligible", () => {
    expect(
      calculateSubstituteEntryChance(0, 100, 45, 0, 0),
    ).toBe(5);
  });
});