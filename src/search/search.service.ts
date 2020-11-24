import { Injectable } from '@nestjs/common';
import { User } from 'src/common/interfaces/user.interface';
import { UserDaoProvider } from 'src/user-dao/user-dao.provider';

@Injectable()
export class SearchService {
  constructor(private readonly userDAO: UserDaoProvider) {}

  public findOne(username: string): Promise<User | null> {
    return this.userDAO.get(username);
  }
}
