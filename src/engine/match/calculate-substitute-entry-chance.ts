export type MatchMoment =
  | "second_half_start"
  | "early_second_half"
  | "mid_second_half"
  | "late_second_half";

function calculateMinuteModifier(minute: number): number {
  if (minute >= 75) {
    return 30;
  }

  if (minute >= 65) {
    return 20;
  }

  if (minute >= 55) {
    return 10;
  }

  return 0;
}

function calculateLevelModifier(difference: number): number {
  if (difference >= 10) {
    return 20;
  }

  if (difference >= 5) {
    return 12;
  }

  if (difference >= 1) {
    return 6;
  }

  if (difference === 0) {
    return 0;
  }

  if (difference >= -4) {
    return -5;
  }

  if (difference >= -9) {
    return -12;
  }

  return -20;
}

function calculateCoachRelationshipModifier(
  coachRelationship: number,
): number {
  if (coachRelationship >= 80) {
    return 10;
  }

  if (coachRelationship >= 60) {
    return 5;
  }

  if (coachRelationship >= 40) {
    return 0;
  }

  if (coachRelationship >= 20) {
    return -8;
  }

  return -15;
}

function calculateFatigueModifier(fatigue: number): number {
  if (fatigue >= 95) {
    return -100;
  }

  if (fatigue >= 85) {
    return 10;
  }

  if (fatigue >= 70) {
    return 7;
  }

  if (fatigue >= 50) {
    return 4;
  }

  return 0;
}

export function calculateSubstituteEntryChance(
  playerLevel: number,
  clubStrength: number,
  minute: number,
  fatigue: number,
  coachRelationship: number,
): number {
  // Um jogador não entra antes do segundo tempo através
  // de uma substituição normal.
  if (minute < 45) {
    return 0;
  }

  // Um jogador com fadiga extremamente alta não deve entrar.
  if (fatigue >= 95) {
    return 0;
  }

  const difference = playerLevel - clubStrength;

  const baseChance = 25;
  const minuteModifier = calculateMinuteModifier(minute);
  const levelModifier = calculateLevelModifier(difference);
  const coachRelationshipModifier =
    calculateCoachRelationshipModifier(coachRelationship);
  const fatigueModifier = calculateFatigueModifier(fatigue);

  const chance =
    baseChance +
    minuteModifier +
    levelModifier +
    coachRelationshipModifier +
    fatigueModifier;

  return Math.min(Math.max(chance, 5), 95);
}