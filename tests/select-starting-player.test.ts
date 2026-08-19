import { describe, expect, it } from "vitest";

import { selectStartingPlayer } from "../src/engine/selection/select-starting-player";

describe("selectStartingPlayer", () => {
  it("should select the player when the random value is below the chance", () => {
    const result = selectStartingPlayer(
      75,
      70,
      "first_division",
      0,
      50,
      0.50,
    );

    expect(result).toBe(true);
  });

  it("should not select the player when the random value is above the chance", () => {
    const result = selectStartingPlayer(
      75,
      70,
      "first_division",
      0,
      50,
      0.90,
    );

    expect(result).toBe(false);
  });

  it("should select a player with a guaranteed chance", () => {
    const result = selectStartingPlayer(
      100,
      50,
      "state",
      0,
      50,
      0.99,
    );

    expect(result).toBe(true);
  });

  it("should give weaker players better starting chances in state competitions", () => {
    const result = selectStartingPlayer(
      60,
      70,
      "state",
      0,
      50,
      0.30,
    );

    expect(result).toBe(true);
  });

  it("should use the same random value consistently around the probability boundary", () => {
    const selected = selectStartingPlayer(
      70,
      70,
      "first_division",
      0,
      50,
      0.59,
    );

    const notSelected = selectStartingPlayer(
      70,
      70,
      "first_division",
      0,
      50,
      0.60,
    );

    expect(selected).toBe(true);
    expect(notSelected).toBe(false);
  });

  it("should not select a player with 95 or more fatigue", () => {
    const result = selectStartingPlayer(
      100,
      50,
      "state",
      95,
      100,
      0,
    );

    expect(result).toBe(false);
  });

  it("should reduce the starting chance when fatigue is high", () => {
    const rested = selectStartingPlayer(
      70,
      70,
      "first_division",
      0,
      50,
      0.55,
    );

    const tired = selectStartingPlayer(
      70,
      70,
      "first_division",
      70,
      50,
      0.55,
    );

    expect(rested).toBe(true);
    expect(tired).toBe(false);
  });
});