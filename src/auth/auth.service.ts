import { Injectable, UnauthorizedException } from '@nestjs/common';
import {
  IdentifiedUser,
  User,
  Username,
} from 'src/users/interfaces/user.inteface';
import { UsersService } from 'src/users/users.service';
import {
  Credentials,
  Password,
  StorageVersion,
} from './interfaces/credentials.interface';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService) {}

  private async validateUser(
    username: Username,
    password: Password,
  ): Promise<(IdentifiedUser & Credentials) | null> {
    const user = await this.usersService.getByUsername(username);
    if (user && user.hash === password) {
      return user;
    }
    return null;
  }

  public async register(
    user: User,
    password: Password,
  ): Promise<Record<string, string>> {
    const credentials: Credentials = {
      hash: password,
      storageVersion: StorageVersion.ARGON2I,
    };

    user = await this.usersService.createUser(user, credentials);
    return { message: 'Success' };
  }

  public async login(
    username: Username,
    password: Password,
  ): Promise<Record<string, string>> {
    const user = await this.validateUser(username, password);
    if (!user) {
      throw new UnauthorizedException();
    }

    return { message: 'Success' };
  }
}
