import type { CompetitionImportance } from "./calculate-selection-chance";
import { calculateStartingChance } from "./calculate-starting-chance";

export function selectStartingPlayer(
  playerLevel: number,
  clubStrength: number,
  competition: CompetitionImportance,
  fatigue: number,
  coachRelationship: number,
  randomValue: number = Math.random(),
): boolean {
  const chance = calculateStartingChance(
    playerLevel,
    clubStrength,
    competition,
    fatigue,
    coachRelationship,
  );

  return randomValue * 100 < chance;
}