import axios from 'axios';

export default (url, client = axios) => client.get(url);
