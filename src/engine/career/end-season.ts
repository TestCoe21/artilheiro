import type { Player } from "../../domain/player/player";
import type { SeasonResult } from "../../domain/career/season-result";
import { advanceYear } from "./advance-year";

export function endSeason(
  player: Player,
  seasonResult: SeasonResult,
): Player {
  return advanceYear(player, seasonResult);
}