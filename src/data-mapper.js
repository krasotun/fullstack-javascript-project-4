/* eslint-disable function-paren-newline */
/* eslint-disable implicit-arrow-linebreak */
import { createWriteStream } from 'fs';
import path from 'path';
import fs from 'fs/promises';
import axios from 'axios';
import cheerio from 'cheerio';

const regEx = /[^0-9a-zA-Z]/g;

const generateFileName = (filePath) => {
  const extension = path.basename(filePath);
  console.log(extension);
};
const generateFolderName = (url) => {
  let newString = url;

  if (url.startsWith('https://')) {
    newString = url.replace('https://', '');
  }

  if (url.startsWith('http://')) {
    newString = url.replace('http://', '');
  }

  return `${newString.trim().replace(regEx, '-')}_files`;
};

const createFolder = (output, url) => {
  const folderPath = path.join(output, '/', generateFolderName(url));
  return fs.mkdir(folderPath, { recursive: true }).then(() => folderPath);
};

const saveFile = (folderPath, url, fileUrl) => {
  axios
    .get(`${url}/${fileUrl}`, { responseType: 'stream' })
    .then((fileContent) =>
      fileContent.data.pipe(
        createWriteStream(`${folderPath}/${Math.random()}.jpg`),
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

    console.log(generateFileName(firstImage));
  });
};

dataMapper(process.cwd(), 'http://127.0.0.1:5500/mock-site');
