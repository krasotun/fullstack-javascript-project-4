import fetchPage from './fetch-page.js';
import resourceNameGenerator from './utils/resource-name-generator.js';
import parseImages from './parse-images.js';
import saveFile from './save-file.js';
import createFolder from './create-folder.js';
import fetchFile from './fetch-file.js';

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
    .then((state) => {
      const imagesFolderPath = `${output}/${resourceNameGenerator(url, true)}`;
      return createFolder(imagesFolderPath).then(() => ({
        ...state,
        imagesFolderPath,
      }));
    })
    .then((state) => {
      const { imagesPaths } = state;
      return Promise.all(imagesPaths.map((imagePath) => fetchFile(imagePath).then((data) => {
        const { imagesFolderPath } = state;
        console.log(data, imagesFolderPath, imagePath);
      })))
        .then(() => state);
    })
    .then(({ fileData }) => {
      const fileName = resourceNameGenerator(url);
      const fullPath = `${output}/${fileName}`;
      return saveFile(fullPath, fileData);
    });
