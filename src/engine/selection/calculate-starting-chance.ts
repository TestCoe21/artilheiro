import { calculateCoachRelationshipModifier } from "./calculate-coach-relationship-modifier";

export type CompetitionImportance =
  | "first_division"
  | "second_division"
  | "national_cup"
  | "regional"
  | "state";

function calculateBaseChance(difference: number): number {
  if (difference >= 10) {
    return 90;
  }

  if (difference >= 5) {
    return 80;
  }

  if (difference >= 1) {
    return 70;
  }

  if (difference === 0) {
    return 60;
  }

  if (difference >= -4) {
    return 50;
  }

  if (difference >= -9) {
    return 35;
  }

  return 20;
}

function calculateCompetitionBonus(
  competition: CompetitionImportance,
): number {
  switch (competition) {
    case "state":
      return 15;

    case "regional":
      return 15;

    case "second_division":
      return 7.5;

    case "national_cup":
      return 5;

    case "first_division":
      return 0;
  }
}

function calculateFatigueModifier(fatigue: number): number {
  if (fatigue >= 95) {
    return -100;
  }

  if (fatigue >= 85) {
    return -25;
  }

  if (fatigue >= 70) {
    return -15;
  }

  if (fatigue >= 50) {
    return -8;
  }

  if (fatigue >= 30) {
    return -3;
  }

  return 0;
}

export function calculateStartingChance(
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