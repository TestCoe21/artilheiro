import { describe, expect, it } from "vitest";

import { shouldMakeSubstitution } from "../src/engine/match/should-make-substitution";

describe("shouldMakeSubstitution", () => {
  it("should not make a substitution before halftime", () => {
    const result = shouldMakeSubstitution(
      {
        minute: 30,
        scoreDifference: 0,
        teamPerformance: 50,
        averageFatigue: 40,
        substitutionsMade: 0,
      },
      0,
    );

    expect(result).toBe(false);
  });

  it("should make a substitution when the accumulated chance is high enough", () => {
    const result = shouldMakeSubstitution(
      {
        minute: 75,
        scoreDifference: -2,
        teamPerformance: 30,
        averageFatigue: 80,
        substitutionsMade: 0,
      },
      0,
    );

    expect(result).toBe(true);
  });

  it("should not make a substitution when the random value is above the chance", () => {
    const result = shouldMakeSubstitution(
      {
        minute: 55,
        scoreDifference: 0,
        teamPerformance: 50,
        averageFatigue: 40,
        substitutionsMade: 0,
      },
      0.99,
    );

    expect(result).toBe(false);
  });

  it("should increase the chance when the team is losing", () => {
    const winning = shouldMakeSubstitution(
      {
        minute: 70,
        scoreDifference: 0,
        teamPerformance: 50,
        averageFatigue: 40,
        substitutionsMade: 0,
      },
      0.1,
    );

    const losing = shouldMakeSubstitution(
      {
        minute: 70,
        scoreDifference: -1,
        teamPerformance: 50,
        averageFatigue: 40,
        substitutionsMade: 0,
      },
      0.1,
    );

    expect(winning).toBe(false);
    expect(losing).toBe(true);
  });

  it("should increase the chance when the team is very fatigued", () => {
    const result = shouldMakeSubstitution(
      {
        minute: 65,
        scoreDifference: 0,
        teamPerformance: 50,
        averageFatigue: 80,
        substitutionsMade: 0,
      },
      0.2,
    );

    expect(result).toBe(true);
  });

  it("should not make more substitutions after reaching the limit", () => {
    const result = shouldMakeSubstitution(
      {
        minute: 80,
        scoreDifference: -3,
        teamPerformance: 20,
        averageFatigue: 90,
        substitutionsMade: 5,
      },
      0,
    );

    expect(result).toBe(false);
  });

  it("should allow a late substitution even when the team is winning", () => {
    const result = shouldMakeSubstitution(
      {
        minute: 85,
        scoreDifference: 2,
        teamPerformance: 50,
        averageFatigue: 60,
        substitutionsMade: 0,
      },
      0.1,
    );

    expect(result).toBe(true);
  });
});