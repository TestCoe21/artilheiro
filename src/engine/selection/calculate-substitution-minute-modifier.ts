export function calculateSubstitutionMinuteModifier(
  minute: number,
): number {
  if (minute < 36) {
    return 0;
  }

  if (minute <= 44) {
    return 2;
  }

  if (minute === 45) {
    return 30;
  }

  if (minute <= 60) {
    return 10;
  }

  if (minute <= 70) {
    return 20;
  }

  if (minute <= 75) {
    return 30;
  }

  if (minute <= 80) {
    return 40;
  }

  if (minute <= 85) {
    return 50;
  }

  if (minute <= 89) {
    return 60;
  }

  return 30;
}