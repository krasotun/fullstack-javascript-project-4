import { writeFile } from 'node:fs/promises';

export default (path, data) => writeFile(path, data);
