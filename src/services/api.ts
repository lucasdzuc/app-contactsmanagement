/* eslint-disable prettier/prettier */
import axios from 'axios';

const api = axios.create({
  baseURL: 'https://contactsmanagement-backend-api.herokuapp.com/',
  // baseURL: 'http://192.168.0.100:3333',
});

export default api;
