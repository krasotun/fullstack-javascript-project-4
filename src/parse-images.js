import * as cheerio from 'cheerio';

export default (html, baseUrl) => {
  const $ = cheerio.load(html);
  const imagePaths = $('img')
    .map((_, element) => {
      const src = $(element).attr('src');
      const path = `${baseUrl}/${src}`;
      return path;
    })
    .get();

  return imagePaths;
};
