export function getDevelopmentLimit(age: number): number {
  if (age <= 19) {
    return 4;
  }

  if (age <= 23) {
    return 3;
  }

  if (age <= 27) {
    return 2;
  }

  if (age <= 31) {
    return 1;
  }

  return 0.5;
}

export function calculateAttributeDevelopment(age: number): number {
  const limit = getDevelopmentLimit(age);

  if (limit === 0.5) {
    return Math.random() < 0.5 ? 0 : 0.5;
  }

  return Math.floor(Math.random() * (limit + 1));
}