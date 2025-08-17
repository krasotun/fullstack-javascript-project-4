import axios from 'axios';

export default (path) => axios.get(path, { responseType: 'arraybuffer' }).then(({ data }) => data);
