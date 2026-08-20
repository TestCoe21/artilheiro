import type { Match } from "../../domain/match/match";

export function canPlayerParticipateInMatch(match: Match): boolean {
  if (match.status === "finished") {
    return false;
  }

  if (!match.playerSelected) {
    return false;
  }

  if (match.playerExited) {
    return false;
  }

  return match.playerStarting || match.playerEntered;
}