// utils/dataGenerator.ts
import { faker } from '@faker-js/faker';

/**
 * Generates a random full person's name.
 * @returns {string} A random full name.
 */
export function generateRandomName(): string {
  return faker.person.fullName();
}

/**
 * Generates a random 12-digit numeric string (simulating an IC number).
 * @returns {string} A 12-digit number string.
 */
export function generateRandomICNumber(): string {
  // '12' specifies the exact length
  return faker.string.numeric(12);
}