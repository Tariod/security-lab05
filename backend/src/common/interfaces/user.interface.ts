import { Credentials } from './credentials.interface';

export interface User {
  username: string;
  mobilephone: string;
  credentials: Credentials;
}
