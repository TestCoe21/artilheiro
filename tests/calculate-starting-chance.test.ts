import { describe, expect, it } from "vitest";

import { calculateStartingChance } from "../src/engine/selection/calculate-starting-chance";

describe("calculateStartingChance", () => {
  it("should give 90% to a player 10 or more points above the club", () => {
    expect(
      calculateStartingChance(80, 70, "first_division", 0, 50),
    ).toBe(90);
  });

  it("should give 80% to a player 5 to 9 points above the club", () => {
    expect(
      calculateStartingChance(75, 70, "first_division", 0, 50),
    ).toBe(80);
  });

  it("should give 70% to a player 1 to 4 points above the club", () => {
    expect(
      calculateStartingChance(72, 70, "first_division", 0, 50),
    ).toBe(70);
  });

  it("should give 60% to a player at the same level as the club", () => {
    expect(
      calculateStartingChance(70, 70, "first_division", 0, 50),
    ).toBe(60);
  });

  it("should give 50% to a player 1 to 4 points below the club", () => {
    expect(
      calculateStartingChance(67, 70, "first_division", 0, 50),
    ).toBe(50);
  });

  it("should give 35% to a player 5 to 9 points below the club", () => {
    expect(
      calculateStartingChance(63, 70, "first_division", 0, 50),
    ).toBe(35);
  });

  it("should give 20% to a player 10 or more points below the club", () => {
    expect(
      calculateStartingChance(60, 70, "first_division", 0, 50),
    ).toBe(20);
  });

  it("should add 15 percentage points in state competitions", () => {
    expect(
      calculateStartingChance(60, 70, "state", 0, 50),
    ).toBe(35);
  });

  it("should add 15 percentage points in regional competitions", () => {
    expect(
      calculateStartingChance(60, 70, "regional", 0, 50),
    ).toBe(35);
  });

  it("should add 7.5 percentage points in the second division", () => {
    expect(
      calculateStartingChance(60, 70, "second_division", 0, 50),
    ).toBe(27.5);
  });

  it("should add 5 percentage points in the national cup", () => {
    expect(
      calculateStartingChance(60, 70, "national_cup", 0, 50),
    ).toBe(25);
  });

  it("should never exceed 100%", () => {
    expect(
      calculateStartingChance(100, 50, "state", 0, 50),
    ).toBe(100);
  });

  it("should keep the minimum base chance at 20%", () => {
    expect(
      calculateStartingChance(0, 100, "first_division", 0, 50),
    ).toBe(20);
  });

  it("should have no fatigue penalty below 30", () => {
    expect(
      calculateStartingChance(70, 70, "first_division", 29, 50),
    ).toBe(60);
  });

  it("should apply a 3 point penalty from 30 fatigue", () => {
    expect(
      calculateStartingChance(70, 70, "first_division", 30, 50),
    ).toBe(57);
  });

  it("should apply an 8 point penalty from 50 fatigue", () => {
    expect(
      calculateStartingChance(70, 70, "first_division", 50, 50),
    ).toBe(52);
  });

  it("should apply a 15 point penalty from 70 fatigue", () => {
    expect(
      calculateStartingChance(70, 70, "first_division", 70, 50),
    ).toBe(45);
  });

  it("should apply a 25 point penalty from 85 fatigue", () => {
    expect(
      calculateStartingChance(70, 70, "first_division", 85, 50),
    ).toBe(35);
  });

  it("should still allow a player with 94 fatigue to start", () => {
    expect(
      calculateStartingChance(70, 70, "first_division", 94, 50),
    ).toBe(35);
  });

  it("should make a player with 95 fatigue unable to start", () => {
    expect(
      calculateStartingChance(70, 70, "first_division", 95, 50),
    ).toBe(0);
  });

  it("should make a player with 100 fatigue unable to start", () => {
    expect(
      calculateStartingChance(100, 50, "state", 100, 100),
    ).toBe(0);
  });
});