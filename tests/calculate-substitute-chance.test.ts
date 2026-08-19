import { describe, expect, it } from "vitest";

import { calculateSubstituteChance } from "../src/engine/selection/calculate-substitute-chance";

describe("calculateSubstituteChance", () => {
  it("should give 95% to a player 10 or more points above the club", () => {
    expect(
      calculateSubstituteChance(80, 70, "first_division", 0, 40),
    ).toBe(95);
  });

  it("should give 90% to a player 5 to 9 points above the club", () => {
    expect(
      calculateSubstituteChance(75, 70, "first_division", 0, 40),
    ).toBe(90);
  });

  it("should give 85% to a player 1 to 4 points above the club", () => {
    expect(
      calculateSubstituteChance(72, 70, "first_division", 0, 40),
    ).toBe(85);
  });

  it("should give 80% to a player at the same level as the club", () => {
    expect(
      calculateSubstituteChance(70, 70, "first_division", 0, 40),
    ).toBe(80);
  });

  it("should give 75% to a player 1 to 4 points below the club", () => {
    expect(
      calculateSubstituteChance(67, 70, "first_division", 0, 40),
    ).toBe(75);
  });

  it("should give 60% to a player 5 to 9 points below the club", () => {
    expect(
      calculateSubstituteChance(63, 70, "first_division", 0, 40),
    ).toBe(60);
  });

  it("should give 40% to a player 10 or more points below the club", () => {
    expect(
      calculateSubstituteChance(60, 70, "first_division", 0, 40),
    ).toBe(40);
  });

  it("should add 10 percentage points in state competitions", () => {
    expect(
      calculateSubstituteChance(60, 70, "state", 0, 40),
    ).toBe(50);
  });

  it("should add 10 percentage points in regional competitions", () => {
    expect(
      calculateSubstituteChance(60, 70, "regional", 0, 40),
    ).toBe(50);
  });

  it("should add 5 percentage points in the second division", () => {
    expect(
      calculateSubstituteChance(60, 70, "second_division", 0, 40),
    ).toBe(45);
  });

  it("should add 3 percentage points in the national cup", () => {
    expect(
      calculateSubstituteChance(60, 70, "national_cup", 0, 40),
    ).toBe(43);
  });

  it("should apply the fatigue modifier", () => {
    expect(
      calculateSubstituteChance(70, 70, "first_division", 50, 40),
    ).toBe(75);
  });

  it("should apply the coach relationship modifier", () => {
    expect(
        calculateSubstituteChance(70, 70, "first_division", 0, 20),
    ).toBe(70);
  });

  it("should never exceed 100%", () => {
    expect(
      calculateSubstituteChance(100, 50, "state", 0, 100),
    ).toBe(100);
  });

  it("should keep the minimum chance at 20%", () => {
    expect(
        calculateSubstituteChance(0, 100, "first_division", 0, 0),
    ).toBe(20);
  });

  it("should be impossible to be a substitute with 95 or more fatigue", () => {
    expect(
      calculateSubstituteChance(100, 50, "state", 95, 100),
    ).toBe(0);
  });
});