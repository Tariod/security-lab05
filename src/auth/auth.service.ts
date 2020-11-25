import { Injectable, UnauthorizedException } from '@nestjs/common';
import { LOGIN_SUCCESS, REGISTRATION_SUCCESS } from 'src/common/constants';
import { User } from 'src/common/interfaces/user.interface';
import { UserDaoProvider } from 'src/user-dao/user-dao.provider';
import { RegisterDTO } from './dto/register.dto';
import { PasswordEncryptionService } from './password-encryption.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly passwordEncryptionService: PasswordEncryptionService,
    private readonly userDAO: UserDaoProvider,
  ) {}

  private async validateUser(
    username: string,
    password: string,
  ): Promise<User | null> {
    const user = await this.userDAO.get(username);
    if (
      user &&
      (await this.passwordEncryptionService.verify(user.credentials, password))
    ) {
      return user;
    }

    return null;
  }

  public async register(registerDTO: RegisterDTO): Promise<string> {
    const { password, ...user } = registerDTO;
    const credentials = await this.passwordEncryptionService.encrypt(password);
    await this.userDAO.save({ ...user, credentials });
    return REGISTRATION_SUCCESS;
  }

  public async login(username: string, password: string): Promise<string> {
    const user = await this.validateUser(username, password);
    if (!user) {
      throw new UnauthorizedException();
    }
    return LOGIN_SUCCESS;
  }
}
