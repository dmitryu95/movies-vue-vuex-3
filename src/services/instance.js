import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://kinopoiskapiunofficial.tech/api/',
  //withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  }
});
export default instance;