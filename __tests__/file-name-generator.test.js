import { describe, expect, it } from '@jest/globals';
import fileNameGenerator from '../src/utils/file-name-generator.js';

describe('fileNameGenerator', () => {
  it('should generate URL', () => {
    expect(fileNameGenerator('https://ru.hexlet.io/courses')).toBe(
      'ru-hexlet-io-courses.html',
    );
  });
});
