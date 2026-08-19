import type { CompetitionImportance } from "./calculate-starting-chance";
import { calculateSubstituteChance } from "./calculate-substitute-chance";
import { calculateSubstitutionMinuteModifier } from "./calculate-substitution-minute-modifier";

export function calculateInGameSubstitutionChance(
  playerLevel: number,
  clubStrength: number,
  competition: CompetitionImportance,
  fatigue: number,
  coachRelationship: number,
  minute: number,
): number {
  if (fatigue >= 95) {
    return 0;
  }

  const substituteChance = calculateSubstituteChance(
    playerLevel,
    clubStrength,
    competition,
    fatigue,
    coachRelationship,
  );

  const minuteModifier =
    calculateSubstitutionMinuteModifier(minute);

  const chance = substituteChance + minuteModifier;

  return Math.min(Math.max(chance, 5), 100);
}