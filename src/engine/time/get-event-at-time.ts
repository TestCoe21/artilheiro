import type { GameTime } from "../../domain/time/game-time";
import type { ScheduledEvent } from "../../domain/time/scheduled-event";

export function getEventAtTime(
  calendar: ScheduledEvent[],
  time: GameTime,
): ScheduledEvent | null {
  return (
    calendar.find(
      (event) =>
        event.date.year === time.year &&
        event.date.month === time.month &&
        event.date.day === time.day &&
        event.window === time.window,
    ) ?? null
  );
}