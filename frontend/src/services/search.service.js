import axios from 'axios';
import { API_URL } from './config.service';

export const findUser = (username) => {
  return axios.get(API_URL + '/search', { params: { username } });
}
