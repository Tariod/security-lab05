import { Credentials } from './credentials.interface';

export interface User {
  username: string;
  credentials: Credentials;
}
