// regNumberGenerator.ts

/**
 * Generates a registration number based on the repeat index.
 * Format: 8 random digits followed by a letter cycling from A to Z.
 * @param repeatIndex The repetition index.
 * @returns {string} The generated registration number.
 */
export function generateRegNumber(repeatIndex: number): string {
  const letter = String.fromCharCode(65 + (repeatIndex % 26));
  const digits = Math.floor(Math.random() * 100000000).toString().padStart(8, '0');
  return digits + '-' + letter;
}