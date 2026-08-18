import type { SeasonPerformance } from "../../domain/career/season-performance";

export function getPrimarySeasonRole(
  performance: SeasonPerformance,
): string | null {
  const entries = Object.entries(performance.appearancesByRole);

  if (entries.length === 0) {
    return null;
  }

  entries.sort((a, b) => b[1] - a[1]);

  return entries[0][0];
}