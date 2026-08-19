import type { GameEvent } from "../../domain/time/game-event";
import type { GameTime } from "../../domain/time/game-time";
import { advanceTime } from "./advance-time";
import { getNextEvent } from "./get-next-event";

export function advanceToNextEvent(
  currentTime: GameTime,
  events: GameEvent[],
): GameTime {
  const nextEvent = getNextEvent(currentTime, events);

  if (!nextEvent) {
    return currentTime;
  }

  let time = currentTime;

  while (true) {
    time = advanceTime(time);

    if (
      time.year === nextEvent.time.year &&
      time.month === nextEvent.time.month &&
      time.day === nextEvent.time.day &&
      time.window === nextEvent.time.window
    ) {
      return time;
    }
  }
}