export function calculateSeasonDevelopment(
  developmentLimit: number
): number {
  if (developmentLimit <= 0) {
    return 0;
  }

  if (developmentLimit >= 4) {
    return 4;
  }

  return Math.floor(developmentLimit);
}