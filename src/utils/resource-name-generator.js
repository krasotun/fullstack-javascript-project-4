const resourceNameGenerator = (url, isFolder = false) => {
  const { hostname, pathname } = new URL(url);

  const fileName = `${(hostname + pathname).replace(/[^a-zA-Z0-9]+/g, '-')}${
    isFolder ? '_files' : '.html'
  }`;

  return fileName;
};

export default resourceNameGenerator;
