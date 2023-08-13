/* eslint-disable implicit-arrow-linebreak */
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs/promises';
import os from 'os';
import nock from 'nock';
import { beforeEach, describe, expect } from '@jest/globals';
import pageLoader from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) =>
  path.join(__dirname, '..', '__fixtures__', filename);

const readFile = (filename) => fs.readFile(getFixturePath(filename), 'utf-8');

describe('#pageLoader', () => {
  let incomingUrl;
  let expectedData;
  let expectedFileName;
  let tempDirPath;

  beforeEach(async () => {
    incomingUrl = await readFile('url.txt');
    expectedData = await readFile('data.txt');
    expectedFileName = await readFile('file-name.txt');
    nock(incomingUrl).get('').reply(200, expectedData);
    tempDirPath = await fs.mkdtemp(path.join(os.tmpdir(), 'page-loader-'));
  });

  afterEach(async () => {
    if (tempDirPath) {
      await fs.rmdir(tempDirPath, { recursive: true });
    }
  });

  it('should save data to html file', async () => {
    await pageLoader(tempDirPath, incomingUrl);
    const savedData = await fs.readFile(
      `${tempDirPath}/${expectedFileName}`,
      'utf-8',
    );
    expect(savedData).toBe(expectedData);
  });
});
