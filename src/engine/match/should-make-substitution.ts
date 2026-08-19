export interface SubstitutionContext {
  minute: number;
  scoreDifference: number;
  teamPerformance: number;
  averageFatigue: number;
  substitutionsMade: number;
}

export function shouldMakeSubstitution(
  context: SubstitutionContext,
  randomValue: number = Math.random(),
): boolean {
  const {
    minute,
    scoreDifference,
    teamPerformance,
    averageFatigue,
    substitutionsMade,
  } = context;

  // Antes do intervalo, substituições são muito raras.
  if (minute < 45) {
    return false;
  }

  let chance = 0;

  // Quanto mais avançada a partida, maior a tendência de substituir.
  if (minute >= 85) {
    chance += 15;
  } else if (minute >= 75) {
    chance += 10;
  } else if (minute >= 65) {
    chance += 6;
  } else if (minute >= 55) {
    chance += 3;
  }

  // Fadiga coletiva aumenta a necessidade de mexer no time.
  if (averageFatigue >= 80) {
    chance += 25;
  } else if (averageFatigue >= 70) {
    chance += 15;
  } else if (averageFatigue >= 60) {
    chance += 8;
  }

  // Time perdendo tende a procurar mudanças.
  if (scoreDifference <= -2) {
    chance += 20;
  } else if (scoreDifference === -1) {
    chance += 12;
  }

  // Time ganhando por dois ou mais pode fazer mudanças para preservar o resultado.
  if (scoreDifference >= 2) {
    chance += 8;
  }

  // Desempenho ruim aumenta a tendência de mudança.
  if (teamPerformance <= 30) {
    chance += 20;
  } else if (teamPerformance <= 45) {
    chance += 10;
  }

  // Limita a quantidade de substituições possíveis.
  if (substitutionsMade >= 5) {
    return false;
  }

  return randomValue * 100 < Math.min(chance, 95);
}