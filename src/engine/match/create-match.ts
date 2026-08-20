import type { Match } from "../../domain/match/match";

export function createMatch(
  opponent: string,
  competition: string,
  home: boolean,
): Match {
  return {
    opponent,
    competition,
    home,

    minute: 0,
    status: "scheduled",

    homeGoals: 0,
    awayGoals: 0,

    playerSelected: false,
    playerStarting: false,
    playerEntered: false,
    playerExited: false,
  };
}