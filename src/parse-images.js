import * as cheerio from 'cheerio';

const parseImages = (html, baseUrl) => {
  const $ = cheerio.load(html);
  const imagePaths = $('img').map((_, element) => {
    const src = $(element).attr('src');
    const path = new URL(src, baseUrl).toString();
    return path;
  }).get();

  console.log(imagePaths);
  return imagePaths;
};

export default parseImages;
