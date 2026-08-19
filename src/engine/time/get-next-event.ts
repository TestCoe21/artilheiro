import type { GameEvent } from "../../domain/time/game-event";
import type { GameTime } from "../../domain/time/game-time";
import { TIME_WINDOWS } from "../../domain/time/time-window";

function compareGameTime(a: GameTime, b: GameTime): number {
  if (a.year !== b.year) {
    return a.year - b.year;
  }

  if (a.month !== b.month) {
    return a.month - b.month;
  }

  if (a.day !== b.day) {
    return a.day - b.day;
  }

  return TIME_WINDOWS.indexOf(a.window) - TIME_WINDOWS.indexOf(b.window);
}

export function getNextEvent(
  currentTime: GameTime,
  events: GameEvent[],
): GameEvent | null {
  const futureEvents = events
    .filter((event) => compareGameTime(event.time, currentTime) > 0)
    .sort((a, b) => compareGameTime(a.time, b.time));

  return futureEvents[0] ?? null;
}