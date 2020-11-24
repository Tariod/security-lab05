import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PasswordHashingVersion } from 'src/common/interfaces/credentials.interface';
import { User } from 'src/common/interfaces/user.interface';
import { UserDocument, UserEntity } from './schemas/user.schema';

@Injectable()
export class UserDaoProvider {
  constructor(
    @InjectModel(UserEntity.name)
    private readonly userModel: Model<UserDocument>,
  ) {}

  public async get(username: string): Promise<User | null> {
    const user = await this.userModel.findOne({ username }).exec();

    if (user === null) {
      return null;
    }

    return {
      username: user.username,
      credentials: {
        hash: user.credentials.hash,
        hashingVersion: user.credentials
          .hashingVersion as PasswordHashingVersion,
      },
    };
  }

  public async save(user: User): Promise<string> {
    const { username, credentials } = user;

    const isExist = await this.isUsernameExist(username);
    if (isExist) {
      throw new HttpException('Username alredy exists', HttpStatus.BAD_REQUEST);
    }

    const userEntity = new this.userModel({ username, credentials });
    await userEntity.save();

    return username;
  }

  // public async update(): Promise<void> {
  //   return;
  // };

  // public async delete(): Promise<void> {
  //   return;
  // };

  private async isUsernameExist(username: string): Promise<boolean> {
    const user = await this.userModel.findOne({ username }).exec();
    return user !== null;
  }
}
