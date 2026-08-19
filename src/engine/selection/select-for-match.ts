import type { CompetitionImportance } from "./calculate-selection-chance";
import { calculateSelectionChance } from "./calculate-selection-chance";

export function selectForMatch(
  playerLevel: number,
  clubStrength: number,
  competition: CompetitionImportance,
  randomValue: number = Math.random(),
): boolean {
  const chance = calculateSelectionChance(
    playerLevel,
    clubStrength,
    competition,
  );

  return randomValue * 100 < chance;
}