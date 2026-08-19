import type { GameTime } from "./game-time";

export type GameEventType =
  | "match"
  | "training"
  | "personal"
  | "rest";

export interface GameEvent {
  id: string;
  type: GameEventType;
  time: GameTime;
  title: string;
  description?: string;
}