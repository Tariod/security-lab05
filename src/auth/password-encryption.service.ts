import * as crypto from 'crypto';
import * as util from 'util';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import {
  Credentials,
  PasswordHashingVersion,
} from 'src/common/interfaces/credentials.interface';
import { argon2i } from 'argon2-ffi';

@Injectable()
export class PasswordEncryptionService {
  public async encrypt(password: string): Promise<Credentials> {
    const passwordSHA512 = await this.hashPassword(password);
    const salt = await this.getRandomBytes(32);
    // TODO
    // Default timeCost = 3,memoryCost=4096,parallelism=1, hashLength=32.
    const hashedPassword = await argon2i.hash(passwordSHA512, salt);
    return {
      hash: hashedPassword,
      hashingVersion: PasswordHashingVersion.ARGON2I,
    };
  }

  public async verify(
    credentials: Credentials,
    password: string,
  ): Promise<boolean> {
    if (credentials.hashingVersion === PasswordHashingVersion.ARGON2I) {
      const passwordSHA512 = await this.hashPassword(password);
      return argon2i.verify(credentials.hash, passwordSHA512);
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

  private get getRandomBytes() {
    return util.promisify(crypto.randomBytes);
  }
}
