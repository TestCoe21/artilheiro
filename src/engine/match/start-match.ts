import type { Match } from "../../domain/match/match";

export function startMatch(match: Match): Match {
  return {
    ...match,
    status: "in_progress",
    minute: 0,
  };
}