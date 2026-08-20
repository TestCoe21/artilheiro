import type { MatchEvent } from "../../domain/match/match-event";

const EVENT_TYPES: MatchEvent["type"][] = [
  "pass",
  "dribble",
  "shot",
  "tackle",
  "save",
];

export function createMatchEvent(
  minute: number,
  random: number = Math.random(),
): MatchEvent | null {
  if (minute <= 0 || minute >= 90) {
    return null;
  }

  if (random < 0.5) {
    return null;
  }

  const index = Math.floor(
    (random - 0.5) * 2 * EVENT_TYPES.length,
  );

  const type = EVENT_TYPES[
    Math.min(index, EVENT_TYPES.length - 1)
  ];

  return {
    minute,
    type,
    description: createDescription(type),
  };
}

function createDescription(
  type: MatchEvent["type"],
): string {
  switch (type) {
    case "pass":
      return "O jogador recebe a bola e procura uma opção de passe.";

    case "dribble":
      return "O jogador tenta avançar com a bola.";

    case "shot":
      return "O jogador encontra espaço para finalizar.";

    case "tackle":
      return "O jogador disputa a bola na defesa.";

    case "save":
      return "O goleiro é obrigado a trabalhar.";

    default:
      return "O jogo segue normalmente.";
  }
}