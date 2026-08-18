import type { SeasonResult } from "../../domain/career/season-result";

export function calculateConfidence(
  currentConfidence: number,
  result: SeasonResult,
): number {
  let confidence = currentConfidence;

  confidence += result.collectiveAwards * 15;
  confidence += result.individualAwards * 25;

  if (result.promoted) {
    confidence += 50;
  }

  if (result.relegated) {
    confidence -= 50;
  }

  return Math.max(0, Math.min(100, confidence));
}