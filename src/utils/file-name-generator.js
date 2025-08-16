const fileNameGenerator = (url) => {
  const { hostname, pathname } = new URL(url);

  const fileName = `${(hostname + pathname).replace(
    /[^a-zA-Z0-9]+/g,
    '-',
  )}.html`;

  return fileName;
};

export default fileNameGenerator;
