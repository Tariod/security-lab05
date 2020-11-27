import { Injectable } from '@nestjs/common';
import { readFileSync } from 'fs';

const COMMON_PASSWORDS_FILE = 'config/top-1000000-password.txt';

@Injectable()
export class PasswordCheckService {
  private readonly commonPasswords: string[];

  constructor() {
    this.commonPasswords = readFileSync(COMMON_PASSWORDS_FILE, {
      encoding: 'utf8',
      flag: 'r',
    }).split('\n');
    this.commonPasswords.pop();
  }

  public check(password: string): boolean {
    return !this.commonPasswords.includes(password);
  }
}
