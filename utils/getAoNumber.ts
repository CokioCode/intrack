export function getAoNumber(str: string): string | null {
  const match = str.match(/(?<=ao_number\s+)[A-Z0-9]+/i);
  return match ? match[0] : null;
}
