import type { CompetitionImportance } from "./calculate-starting-chance";
import { calculateCoachRelationshipModifier } from "./calculate-coach-relationship-modifier";

function calculateBaseChance(difference: number): number {
  if (difference >= 10) {
    return 95;
  }

  if (difference >= 5) {
    return 90;
  }

  if (difference >= 1) {
    return 85;
  }

  if (difference === 0) {
    return 80;
  }

  if (difference >= -4) {
    return 75;
  }

  if (difference >= -9) {
    return 60;
  }

  return 40;
}

function calculateCompetitionBonus(
  competition: CompetitionImportance,
): number {
  switch (competition) {
    case "state":
      return 10;

    case "regional":
      return 10;

    case "second_division":
      return 5;

    case "national_cup":
      return 3;

    case "first_division":
      return 0;
  }
}

function calculateFatigueModifier(fatigue: number): number {
  if (fatigue >= 95) {
    return -100;
  }

  if (fatigue >= 85) {
    return -20;
  }

  if (fatigue >= 70) {
    return -10;
  }

  if (fatigue >= 50) {
    return -5;
  }

  if (fatigue >= 30) {
    return -2;
  }

  return 0;
}

export function calculateSubstituteChance(
  playerLevel: number,
  clubStrength: number,
  competition: CompetitionImportance,
  fatigue: number,
  coachRelationship: number,
): number {
  if (fatigue >= 95) {
    return 0;
  }

  const difference = playerLevel - clubStrength;

  const baseChance = calculateBaseChance(difference);
  const competitionBonus = calculateCompetitionBonus(competition);
  const coachRelationshipModifier =
    calculateCoachRelationshipModifier(coachRelationship);
  const fatigueModifier = calculateFatigueModifier(fatigue);

  const chance =
    baseChance +
    competitionBonus +
    coachRelationshipModifier +
    fatigueModifier;

  return Math.min(Math.max(chance, 5), 100);
}