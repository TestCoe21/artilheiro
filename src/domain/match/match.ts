export interface Match {
  opponent: string;
  competition: string;
  home: boolean;

  minute: number;
  status: "scheduled" | "in_progress" | "finished";

  homeGoals: number;
  awayGoals: number;

  playerSelected: boolean;
  playerStarting: boolean;
  playerEntered: boolean;
  playerExited: boolean;
}