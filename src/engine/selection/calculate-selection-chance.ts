export type CompetitionImportance =
  | "first_division"
  | "second_division"
  | "national_cup"
  | "regional"
  | "state";

export function calculateSelectionChance(
  playerLevel: number,
  clubStrength: number,
  competition: CompetitionImportance,
): number {
  const difference = playerLevel - clubStrength;

  let chance: number;

  switch (competition) {
    case "first_division":
      chance = 50 + difference * 5;
      break;

    case "second_division":
      chance = 60 + difference * 5;
      break;

    case "national_cup":
      chance = 50 + difference * 5;
      break;

    case "regional":
      chance = 70 + difference * 5;
      break;

    case "state":
      chance = 80 + difference * 5;
      break;
  }

  return Math.min(Math.max(chance, 5), 100);
}