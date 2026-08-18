import type { SeasonPerformance } from "../../domain/career/season-performance";

export function registerRoleAppearance(
  season: SeasonPerformance,
  role: string,
): SeasonPerformance {
  return {
    ...season,
    appearancesByRole: {
      ...season.appearancesByRole,
      [role]: (season.appearancesByRole[role] ?? 0) + 1,
    },
  };
}