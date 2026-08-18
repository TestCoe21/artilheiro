import type { SeasonPerformance } from "../../domain/career/season-performance";

interface RegisterMatchPerformanceInput {
  role: string;
  goals?: number;
  assists?: number;
}

export function registerMatchPerformance(
  performance: SeasonPerformance,
  match: RegisterMatchPerformanceInput
): SeasonPerformance {
  const currentAppearances = performance.appearancesByRole[match.role] ?? 0;

  return {
    ...performance,

    appearancesByRole: {
      ...performance.appearancesByRole,
      [match.role]: currentAppearances + 1,
    },

    matchesPlayed: performance.matchesPlayed + 1,
    goals: performance.goals + (match.goals ?? 0),
    assists: performance.assists + (match.assists ?? 0),
  };
}