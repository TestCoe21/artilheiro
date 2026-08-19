import type { CompetitionImportance } from "./calculate-starting-chance";
import { calculateSubstituteChance } from "./calculate-substitute-chance";

export function selectSubstitute(
  playerLevel: number,
  clubStrength: number,
  competition: CompetitionImportance,
  fatigue: number,
  coachRelationship: number,
  randomValue: number = Math.random(),
): boolean {
  const chance = calculateSubstituteChance(
    playerLevel,
    clubStrength,
    competition,
    fatigue,
    coachRelationship,
  );

  return randomValue * 100 < chance;
}