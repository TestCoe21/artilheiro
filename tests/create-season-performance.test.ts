import { describe, expect, it } from "vitest";
import { createSeasonPerformance } from "../src/engine/career/create-season-performance";

describe("createSeasonPerformance", () => {
  it("deve criar uma temporada com estatísticas zeradas", () => {
    const performance = createSeasonPerformance();

    expect(performance).toEqual({
      appearancesByRole: {},
      matchesPlayed: 0,
      goals: 0,
      assists: 0,
    });
  });
});