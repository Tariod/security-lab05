import { Exclude } from 'class-transformer';
import { Credentials } from 'src/common/interfaces/credentials.interface';
import { User } from 'src/common/interfaces/user.interface';

export class SearchUserDTO implements User {
  public username: string;

  public mobilephone: string;

  @Exclude()
  public credentials: Credentials;

  constructor(partial: Partial<User>) {
    Object.assign(this, partial);
  }
}
