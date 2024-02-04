import axios from 'axios';
import { store } from '../store/index.js'
import { watchEffect } from 'vue';

const instance = axios.create({
  baseURL: 'https://kinopoiskapiunofficial.tech/api/',
  //withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  }
});
export default instance;