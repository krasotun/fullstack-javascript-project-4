/* eslint-disable function-paren-newline */
/* eslint-disable implicit-arrow-linebreak */
import { createWriteStream } from 'fs';
import path from 'path';
import fs from 'fs/promises';
import axios from 'axios';
import cheerio from 'cheerio';

const regEx = /[^0-9a-zA-Z]/g;

const generateFileName = (url, filePath) => {
  const urlToParse = new URL(url);
  return `${urlToParse.hostname.replace(regEx, '-')}-assets${filePath.replace(
    /\//g,
    '-',
  )}`;
};
const generateFolderName = (url) => {
  const urlToParse = new URL(url);
  return `${(urlToParse.hostname + urlToParse.pathname).replace(
    regEx,
    '-',
  )}_files`;
};

const createFolder = (output, url) => {
  const folderPath = path.join(output, '/', generateFolderName(url));
  return fs.mkdir(folderPath, { recursive: true }).then(() => folderPath);
};

const saveFile = (folderPath, url, filePath) => {
  const urlToParse = new URL(url);
  axios
    .get(`${urlToParse.origin}${filePath}`, { responseType: 'stream' })
    .then((fileContent) =>
      fileContent.data.pipe(
        createWriteStream(`${folderPath}/${generateFileName(url, filePath)}`),
      ),
    );
};

const dataMapper = (output, url) => {
  let html;

  axios.get(url).then(({ data }) => {
    html = data;
    const $ = cheerio.load(html);

    const imagesUrls = [
      ...$('img').map((_, element) => $(element).attr('src')),
    ];
    // eslint-disable-next-line no-unused-vars
    const [firstImage, _] = imagesUrls;
    createFolder(output, url).then((folderPath) =>
      saveFile(folderPath, url, firstImage),
    );
  });
};

dataMapper(process.cwd(), ' http://127.0.0.1:5500/site');
