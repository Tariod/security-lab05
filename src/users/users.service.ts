import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Credentials } from 'src/common/schemas/credentials.schema';
import { User, UserDocument } from '../common/schemas/user.schema';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
  ) {}

  public async createUser(
    username: string,
    credentials: Credentials,
  ): Promise<User> {
    const isExist = await this.isUsernameExist(username);
    if (isExist) {
      throw new HttpException('Username alredy exists', HttpStatus.BAD_REQUEST);
    }

    const userEntity = new this.userModel({ username, credentials });
    return userEntity.save();
  }

  public async getByUsername(username: string): Promise<User | null> {
    return this.userModel.findOne({ username }).exec();
  }

  public async isUsernameExist(username: string): Promise<boolean> {
    const user = await this.userModel.findOne({ username }).exec();
    return user !== null;
  }
}
