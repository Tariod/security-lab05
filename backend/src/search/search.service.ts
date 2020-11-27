import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { User } from 'src/common/interfaces/user.interface';
import { UserDaoProvider } from 'src/user-dao/user-dao.provider';

@Injectable()
export class SearchService {
  constructor(private readonly userDAO: UserDaoProvider) {}

  public findOne(username: string): Promise<User | null> {
    if (!new RegExp(/^\w{1,16}$/).test(username)) {
      throw new HttpException(
        'Username must contain only letters and numbers.',
        HttpStatus.BAD_REQUEST,
      );
    }
    return this.userDAO.get(username);
  }
}
