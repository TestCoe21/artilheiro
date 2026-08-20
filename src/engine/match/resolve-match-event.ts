import type { Match } from "../../domain/match/match";
import type { MatchEvent } from "../../domain/match/match-event";
import { resolveShot } from "./resolve-shot";

interface ResolveMatchEventInput {
  finishing: number;
  positioning: number;
  ballControl: number;
  confidence: number;
  defensivePressure: number;
  random?: number;
}

export function resolveMatchEvent(
  match: Match,
  event: MatchEvent,
  input: ResolveMatchEventInput,
): Match {
  if (event.type !== "shot") {
    return match;
  }

  const result = resolveShot(input);

  if (result !== "goal") {
    return match;
  }

  if (match.home) {
    return {
      ...match,
      homeGoals: match.homeGoals + 1,
    };
  }

  return {
    ...match,
    awayGoals: match.awayGoals + 1,
  };
}