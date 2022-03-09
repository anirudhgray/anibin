import axios from 'axios';
const instance = axios.create({ baseURL: 'https://anibin-api.herokuapp.com' });
export default instance;
