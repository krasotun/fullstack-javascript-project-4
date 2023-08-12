import fs from 'fs/promises';

export default (path, data) => fs.writeFile(path, data);
