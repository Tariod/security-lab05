import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PasswordHashingVersion } from 'src/common/interfaces/credentials.interface';
import { User } from 'src/common/interfaces/user.interface';
import { SecurityService } from 'src/security/security.service';
import { UserDocument, UserEntity } from './schemas/user.schema';

@Injectable()
export class UserDaoProvider {
  constructor(
    @InjectModel(UserEntity.name)
    private readonly userModel: Model<UserDocument>,
    private readonly securityService: SecurityService,
  ) {}

  public async get(username: string): Promise<User | null> {
    const user = await this.userModel.findOne({ username }).exec();

    if (user === null) {
      return null;
    }
    const { mobilephone: ciphertext, credentials } = user;

    const [mobilephone, hash] = await Promise.all([
      this.securityService.decrypt(ciphertext),
      this.securityService.decrypt(credentials.hash),
    ]);

    return {
      username: user.username,
      mobilephone: mobilephone.toString(),
      credentials: {
        hash: hash.toString(),
        hashingVersion: credentials.hashingVersion as PasswordHashingVersion,
      },
    };
  }

  public async save(user: User): Promise<string> {
    const { username, mobilephone, credentials } = user;

    const isExist = await this.isUsernameExist(username);
    if (isExist) {
      throw new HttpException('Username alredy exists', HttpStatus.BAD_REQUEST);
    }

    const [encryptedMobilephone, encryptedPassword] = await Promise.all([
      this.securityService.encrypt(Buffer.from(mobilephone)),
      this.securityService.encrypt(Buffer.from(credentials.hash)),
    ]);

    const userEntity = new this.userModel({
      username,
      mobilephone: encryptedMobilephone,
      credentials: {
        hash: encryptedPassword,
        hashingVersion: credentials.hashingVersion,
      },
    });
    await userEntity.save();

    return username;
  }

  private async isUsernameExist(username: string): Promise<boolean> {
    const user = await this.userModel.findOne({ username }).exec();
    return user !== null;
  }
}
