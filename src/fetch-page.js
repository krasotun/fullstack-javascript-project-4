import axios from 'axios';

const fetchPage = (url) => axios.get(url).then(({ data }) => data);

export default fetchPage;
