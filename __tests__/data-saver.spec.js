/* eslint-disable object-curly-newline */
/* eslint-disable implicit-arrow-linebreak */
import fs from 'fs/promises';
import mock from 'mock-fs';
import { afterEach, beforeEach, describe, expect } from '@jest/globals';
import dataSaver from '../src/data-saver.js';

describe('#dataSaver', () => {
  let data;

  beforeEach(async () => {
    mock({
      mockPath: {
        mockData: 'data for save',
      },
      savedData: {},
    });

    data = await fs.readFile('mockPath/mockData', 'utf-8');
  });

  afterEach(mock.restore);

  it('should save file with data to path', async () => {
    dataSaver('mockPath/savedData', data);

    const expectedData = await fs.readFile('mockPath/savedData', 'utf-8');

    expect(expectedData).toBe(data);
  });
});
