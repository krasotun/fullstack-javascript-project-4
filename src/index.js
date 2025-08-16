import { writeFile } from 'node:fs/promises';
import fetchPage from './fetch-page.js';
import fileNameGenerator from './utils/file-name-generator.js';

export default (output, url) => fetchPage(url)
  .then((fileData) => {
    const fileName = fileNameGenerator(url);
    const fullPath = `${output}/${fileName}`;
    writeFile(fullPath, fileData);
  });
