/* eslint-disable implicit-arrow-linebreak */
import { readFileSync } from 'fs';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import { describe, expect } from '@jest/globals';
import fileNameGenerator from '../src/file-name-generator.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) =>
  path.join(__dirname, '..', '__fixtures__', filename);

const readFile = (filename) => readFileSync(getFixturePath(filename), 'utf-8');

describe('#fileNameGenerator', () => {
  const incomingUrl = readFile('incoming-url.txt');

  const result = readFile('expected-file-name.txt');

  test('should return file name from url', () => {
    expect(fileNameGenerator(incomingUrl)).toBe(result);
  });
});
