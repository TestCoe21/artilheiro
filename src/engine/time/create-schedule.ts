import type { GameSchedule } from "../../domain/time/game-schedule";
import type { GameEvent } from "../../domain/time/game-event";
import type { GameTime } from "../../domain/time/game-time";

function createTime(
  year: number,
  month: number,
  day: number,
  window: GameTime["window"],
): GameTime {
  return {
    year,
    month,
    day,
    window,
  };
}

export function createSchedule(
  startDate: {
    year: number;
    month: number;
    day: number;
  },
): GameSchedule {
  const events: GameEvent[] = [];

  const addEvent = (
    id: string,
    type: GameEvent["type"],
    dayOffset: number,
    window: GameTime["window"],
    title: string,
    description?: string,
  ) => {
    const date = new Date(
      startDate.year,
      startDate.month - 1,
      startDate.day,
    );

    date.setDate(date.getDate() + dayOffset);

    events.push({
      id,
      type,
      time: createTime(
        date.getFullYear(),
        date.getMonth() + 1,
        date.getDate(),
        window,
      ),
      title,
      description,
    });
  };

  /*
   * Semana inicial de exemplo.
   *
   * Segunda:
   * treino normal
   *
   * Terça:
   * treino normal
   *
   * Quarta:
   * jogo
   *
   * Quinta:
   * recuperação/pós-jogo
   *
   * Sexta:
   * treino normal
   *
   * Sábado:
   * treino pela manhã + concentração à tarde
   *
   * Domingo:
   * jogo
   */

  addEvent(
    "training-001",
    "training",
    0,
    "08:30",
    "Treinamento",
    "Treinamento normal do elenco.",
  );

  addEvent(
    "training-002",
    "training",
    1,
    "08:30",
    "Treinamento",
    "Treinamento normal do elenco.",
  );

  addEvent(
    "match-001",
    "match",
    2,
    "16:30",
    "Partida",
    "Partida oficial.",
  );

  addEvent(
    "training-003",
    "training",
    3,
    "16:30",
    "Treinamento",
    "Treinamento de recuperação após a partida.",
  );

  addEvent(
    "training-004",
    "training",
    4,
    "08:30",
    "Treinamento",
    "Treinamento normal do elenco.",
  );

  addEvent(
    "training-005",
    "training",
    5,
    "08:30",
    "Treinamento",
    "Treinamento pré-jogo.",
  );

  addEvent(
    "personal-001",
    "personal",
    5,
    "16:30",
    "Concentração",
    "O elenco entra em concentração para a partida.",
  );

  addEvent(
    "match-002",
    "match",
    6,
    "16:30",
    "Partida",
    "Partida oficial.",
  );

  return {
    events,
  };
}