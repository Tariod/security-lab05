import axios from 'axios';
import { API_URL } from './config.service';

export const register = (username, mobilephone,password) => {
  return axios.post(API_URL + '/auth/register', {
    username,
    mobilephone,
    password,
  });
};

export const login = (username, password) => {
  return axios.post(API_URL + '/auth/login', {
    username,
    password,
  });
};
