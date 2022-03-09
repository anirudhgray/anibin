import axios from 'axios';
const instance = axios.create({ baseURL: 'https://anibin.herokuapp.com' });
export default instance;
