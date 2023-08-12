/* eslint-disable implicit-arrow-linebreak */
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs/promises';
import { beforeEach, describe, expect } from '@jest/globals';
import fileNameGenerator from '../src/file-name-generator.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) =>
  path.join(__dirname, '..', '__fixtures__', filename);

const readFile = (filename) => fs.readFile(getFixturePath(filename), 'utf-8');

let incomingUrl;
let result;

describe('#fileNameGenerator', () => {
  beforeEach(async () => {
    incomingUrl = await readFile('incoming-url.txt');
    result = await readFile('expected-file-name.txt');
  });

  it('should return file name from url', () => {
    expect(fileNameGenerator(incomingUrl)).toBe(result);
  });
});
