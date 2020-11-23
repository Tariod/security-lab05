import * as crypto from 'crypto';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PasswordHashingVersion } from 'src/common/interfaces/password-hashing-version.interface';
import { Credentials } from 'src/common/schemas/credentials.schema';

@Injectable()
export class PasswordEncryptionService {
  public async encrypt(password: string): Promise<Credentials> {
    const hash = await this.hashPassword(password);
    return {
      hash,
      hashingVersion: PasswordHashingVersion.ARGON2I,
    };
  }

  public async verify(
    credentials: Credentials,
    password: string,
  ): Promise<boolean> {
    const hash = await this.hashPassword(password);

    if (credentials.hashingVersion === PasswordHashingVersion.ARGON2I) {
      return Buffer.compare(hash, credentials.hash) === 0;
    } else {
      throw new HttpException(
        'Wrong hash method',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  private async hashPassword(password: string): Promise<Buffer> {
    const sha512 = crypto.createHash('sha512');
    return sha512.update(password).digest();
  }
}
