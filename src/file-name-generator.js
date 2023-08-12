const regEx = /[^0-9a-zA-Z]/g;

export default (url) => {
  let newString = '';
  if (url.startsWith('https://')) {
    newString = url.replace('https://', '');
  }

  if (url.startsWith('http://')) {
    newString = url.replace('http://', '');
  }

  return `${newString.trim().replace(regEx, '-')}.html`;
};
