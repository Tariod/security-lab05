import { Injectable, UnauthorizedException } from '@nestjs/common';
import { User } from 'src/common/schemas/user.schema';
import { UsersService } from 'src/users/users.service';
import { PasswordEncryptionService } from './password-encryption.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly passwordEncryptionService: PasswordEncryptionService,
    private readonly usersService: UsersService,
  ) {}

  private async validateUser(
    username: string,
    password: string,
  ): Promise<User | null> {
    const user = await this.usersService.getByUsername(username);
    if (
      user &&
      (await this.passwordEncryptionService.verify(user.credentials, password))
    ) {
      return user;
    }
    return null;
  }

  public async register(
    username: string,
    password: string,
  ): Promise<Record<string, string>> {
    const credentials = await this.passwordEncryptionService.encrypt(password);
    const user = await this.usersService.createUser(username, credentials);
    return { message: 'Success' };
  }

  public async login(
    username: string,
    password: string,
  ): Promise<Record<string, string>> {
    const user = await this.validateUser(username, password);
    if (!user) {
      throw new UnauthorizedException();
    }

    return { message: 'Success' };
  }
}
