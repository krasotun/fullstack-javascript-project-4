/* eslint-disable function-paren-newline */
/* eslint-disable implicit-arrow-linebreak */
import dataSaver from './data-saver.js';
import httpRequest from './http-request.js';
import fileNameGenerator from './file-name-generator.js';
import errorHandler from './error-handler.js';

export default (output, url) => {
  const fileName = fileNameGenerator(url);
  const outputPath = `${output}/${fileName}`;
  return httpRequest(url)
    .then((response) => dataSaver(outputPath, response.data))
    .then(() => outputPath)
    .catch(errorHandler);
};
