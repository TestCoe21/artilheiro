import type { TimeWindow } from "./time-window";

export interface GameTime {
  year: number;
  month: number;
  day: number;
  window: TimeWindow;
}