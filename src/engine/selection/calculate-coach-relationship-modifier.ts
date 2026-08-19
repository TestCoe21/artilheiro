export function calculateCoachRelationshipModifier(
  coachRelationship: number,
): number {
  if (coachRelationship <= 19) {
    return -20;
  }

  if (coachRelationship <= 39) {
    return -10;
  }

  if (coachRelationship <= 59) {
    return 0;
  }

  if (coachRelationship <= 79) {
    return 5;
  }

  return 10;
}