import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { LOGIN_SUCCESS, REGISTRATION_SUCCESS } from 'src/common/constants';
import { User } from 'src/common/interfaces/user.interface';
import { UserDaoProvider } from 'src/user-dao/user-dao.provider';
import { RegisterDTO } from './dto/register.dto';
import { PasswordHashingService } from '../security/password-hashing.service';
import { PasswordCheckService } from 'src/security/password-check.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly passwordCheckService: PasswordCheckService,
    private readonly passwordHashingService: PasswordHashingService,
    private readonly userDAO: UserDaoProvider,
  ) {}

  private async validateUser(
    username: string,
    password: string,
  ): Promise<User | null> {
    const user = await this.userDAO.get(username);
    if (
      user &&
      (await this.passwordHashingService.verify(user.credentials, password))
    ) {
      return user;
    }

    return null;
  }

  public async register(registerDTO: RegisterDTO): Promise<string> {
    const { password, ...user } = registerDTO;

    if (!this.passwordCheckService.check(password)) {
      throw new HttpException(
        "Don't use common passwords.",
        HttpStatus.BAD_REQUEST,
      );
    }

    const credentials = await this.passwordHashingService.encrypt(password);
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
