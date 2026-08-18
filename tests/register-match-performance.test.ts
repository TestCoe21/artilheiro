import { describe, expect, it } from "vitest";
import { registerMatchPerformance } from "../src/engine/career/register-match-performance";

describe("registerMatchPerformance", () => {
  it("deve registrar uma partida e a função exercida", () => {
    const season = {
      appearancesByRole: {
        ST: 10,
      },
      matchesPlayed: 10,
      goals: 4,
      assists: 2,
    };

    const match = {
      role: "ST",
      goals: 2,
      assists: 1,
    };

    const result = registerMatchPerformance(season, match);

    expect(result.appearancesByRole.ST).toBe(11);
    expect(result.matchesPlayed).toBe(11);
    expect(result.goals).toBe(6);
    expect(result.assists).toBe(3);
  });

  it("deve registrar uma nova função", () => {
    const season = {
      appearancesByRole: {
        ST: 10,
      },
      matchesPlayed: 10,
      goals: 4,
      assists: 2,
    };

    const match = {
      role: "CAM",
      goals: 1,
      assists: 2,
    };

    const result = registerMatchPerformance(season, match);

    expect(result.appearancesByRole.ST).toBe(10);
    expect(result.appearancesByRole.CAM).toBe(1);
    expect(result.matchesPlayed).toBe(11);
    expect(result.goals).toBe(5);
    expect(result.assists).toBe(4);
  });

  it("não deve alterar a temporada original", () => {
    const season = {
      appearancesByRole: {
        ST: 10,
      },
      matchesPlayed: 10,
      goals: 4,
      assists: 2,
    };

    const match = {
      role: "ST",
      goals: 1,
      assists: 1,
    };

    registerMatchPerformance(season, match);

    expect(season.appearancesByRole.ST).toBe(10);
    expect(season.matchesPlayed).toBe(10);
    expect(season.goals).toBe(4);
    expect(season.assists).toBe(2);
  });

  it("deve funcionar com uma partida sem gols ou assistências", () => {
    const season = {
      appearancesByRole: {},
      matchesPlayed: 0,
      goals: 0,
      assists: 0,
    };

    const match = {
      role: "CB",
      goals: 0,
      assists: 0,
    };

    const result = registerMatchPerformance(season, match);

    expect(result.appearancesByRole.CB).toBe(1);
    expect(result.matchesPlayed).toBe(1);
    expect(result.goals).toBe(0);
    expect(result.assists).toBe(0);
  });
});