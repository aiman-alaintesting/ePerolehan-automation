// utils/dataGenerator.ts
import { faker } from '@faker-js/faker';
import { companyNames } from './Sole-Proprietorship/companyNames';
import { generateRegNumber } from './Sole-Proprietorship/regNumberGenerator';

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

/**
 * Generates dynamic registration number and company name based on repeat index.
 * [Business Type: Sole-Proprietorship]
 * @param repeatIndex The repetition index from test.info().repeatEachIndex.
 * @returns {object} An object with regNo and companyName.
 */
export function generateDynamicValues(repeatIndex: number): { regNo: string, companyName: string } {
  const regNo = generateRegNumber(repeatIndex);
  const companyName = companyNames[repeatIndex % companyNames.length];
  return { regNo, companyName };
}