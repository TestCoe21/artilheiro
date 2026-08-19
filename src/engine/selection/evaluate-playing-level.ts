export type PlayingLevel =
  | "starter"
  | "starter_competition"
  | "balanced"
  | "reserve"
  | "low_opportunity";

export function evaluatePlayingLevel(
  playerLevel: number,
  clubStrength: number,
): PlayingLevel {
  const difference = playerLevel - clubStrength;

  if (difference >= 10) {
    return "starter";
  }

  if (difference >= 3) {
    return "starter_competition";
  }

  if (difference >= -2) {
    return "balanced";
  }

  if (difference >= -9) {
    return "reserve";
  }

  return "low_opportunity";
}