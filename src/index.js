import fetchPage from './fetch-page.js';
import resourceNameGenerator from './utils/resource-name-generator.js';
import parseImages from './parse-images.js';
import saveFile from './save-file.js';
import createFolder from './create-folder.js';

export default (output, url) =>
  // eslint-disable-next-line implicit-arrow-linebreak
  fetchPage(url)
    .then((fileData) => {
      const state = {
        fileData,
        imagesPaths: parseImages(fileData, url),
      };
      return state;
    })
    .then((imagesPaths) => {
      const imagesFolderPath = `${output}/${resourceNameGenerator(url, true)}`;
      return createFolder(imagesFolderPath).then(() => ({
        imagesPaths,
        imagesFolderPath,
      }));
    })
    .then(() => {
      const fileName = resourceNameGenerator(url);
      const fullPath = `${output}/${fileName}`;
      saveFile(fullPath, fileData);
    });
