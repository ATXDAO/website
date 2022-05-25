export const limitChars = (s: string, count: number): string => {
  if (s) {
    return `${s.slice(0, count)}\u2026`;
  }

  return '';
};
