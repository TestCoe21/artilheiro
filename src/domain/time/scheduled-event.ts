export type ScheduledEventType =
  | "match"
  | "training"
  | "personal";

export interface ScheduledEvent {
  id: string;
  date: {
    year: number;
    month: number;
    day: number;
  };
  window: "08:30" | "12:00" | "16:30" | "21:00";
  type: ScheduledEventType;
  title: string;
  description?: string;
}