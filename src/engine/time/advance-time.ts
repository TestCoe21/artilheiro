import type { GameTime } from "../../domain/time/game-time";
import { TIME_WINDOWS } from "../../domain/time/time-window";

export function advanceTime(
  current: GameTime,
): GameTime {

  const currentIndex = TIME_WINDOWS.indexOf(current.window);

  if (currentIndex < TIME_WINDOWS.length - 1) {
    return {
      ...current,
      window: TIME_WINDOWS[currentIndex + 1],
    };
  }

  const nextDate = new Date(
    current.year,
    current.month - 1,
    current.day,
  );

  nextDate.setDate(nextDate.getDate() + 1);

  return {
    year: nextDate.getFullYear(),
    month: nextDate.getMonth() + 1,
    day: nextDate.getDate(),
    window: TIME_WINDOWS[0],
  };
}