import type { Match } from "../../domain/match/match";

export function advanceMatchMinute(match: Match): Match {
  if (match.status === "finished") {
    return match;
  }

  const nextMinute = Math.min(match.minute + 1, 90);

  return {
    ...match,
    minute: nextMinute,
    status: nextMinute >= 90 ? "finished" : "in_progress",
  };
}