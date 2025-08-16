import { describe, expect, it } from '@jest/globals';
import fileNameGenerator from '../src/utils/resource-name-generator.js';

describe('fileNameGenerator', () => {
  it('should generate html file name if isFolder not provided', () => {
    expect(fileNameGenerator('https://ru.hexlet.io/courses')).toBe(
      'ru-hexlet-io-courses.html',
    );
  });
  it('should generate folder name if isFolder provided', () => {
    expect(fileNameGenerator('https://ru.hexlet.io/courses', true)).toBe(
      'ru-hexlet-io-courses_files',
    );
  });
});
