import { writeFile } from 'node:fs/promises';
import fetchPage from './fetch-page.js';
import resourceNameGenerator from './utils/resource-name-generator.js';
import parseImages from './parse-images.js';

export default (output, url) => fetchPage(url)
  .then((fileData) => {
    parseImages(fileData, url);
    const fileName = resourceNameGenerator(url);
    const fullPath = `${output}/${fileName}`;
    writeFile(fullPath, fileData);
  });
