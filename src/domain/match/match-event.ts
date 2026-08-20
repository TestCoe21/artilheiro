export type MatchEventType =
  | "pass"
  | "dribble"
  | "shot"
  | "goal"
  | "tackle"
  | "save"
  | "substitution";

export interface MatchEvent {
  minute: number;
  type: MatchEventType;
  description: string;
}