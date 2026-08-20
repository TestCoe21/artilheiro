import type { Match } from "../../domain/match/match";
import type { MatchEvent } from "../../domain/match/match-event";
import { advanceMatchMinute } from "./advance-match-minute";
import { canPlayerParticipateInMatch } from "./can-player-participate-in-match";
import { createMatchEvent } from "./create-match-event";
import { resolveMatchEvent } from "./resolve-match-event";

interface ProcessMatchMinuteInput {
  finishing: number;
  positioning: number;
  ballControl: number;
  confidence: number;
  defensivePressure: number;
  random?: number;
}

interface ProcessMatchMinuteResult {
  match: Match;
  event: MatchEvent | null;
}

export function processMatchMinute(
  match: Match,
  input: ProcessMatchMinuteInput,
): ProcessMatchMinuteResult {
  const advancedMatch = advanceMatchMinute(match);

  if (advancedMatch.status === "finished") {
    return {
      match: advancedMatch,
      event: null,
    };
  }

  if (!canPlayerParticipateInMatch(advancedMatch)) {
    return {
      match: advancedMatch,
      event: null,
    };
  }

  const event = createMatchEvent(
    advancedMatch.minute,
    input.random,
  );

  if (!event) {
    return {
      match: advancedMatch,
      event: null,
    };
  }

  const resolvedMatch = resolveMatchEvent(
    advancedMatch,
    event,
    input,
  );

  return {
    match: resolvedMatch,
    event,
  };
}