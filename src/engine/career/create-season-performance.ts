import type { SeasonPerformance } from "../../domain/career/season-performance";

export function createSeasonPerformance(): SeasonPerformance {
  return {
    appearancesByRole: {},
    matchesPlayed: 0,
    goals: 0,
    assists: 0,
  };
}