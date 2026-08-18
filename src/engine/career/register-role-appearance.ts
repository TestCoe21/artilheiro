import type { SeasonPerformance } from "../../domain/career/season-performance";

export function registerRoleAppearance(
  performance: SeasonPerformance,
  role: string,
): SeasonPerformance {
  return {
    appearancesByRole: {
      ...performance.appearancesByRole,
      [role]: (performance.appearancesByRole[role] ?? 0) + 1,
    },
  };
}