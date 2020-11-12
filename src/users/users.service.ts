import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import {
  Credentials,
  StorageVersion,
} from 'src/auth/interfaces/credentials.interface';
import { IdentifiedUser, User, Username } from './interfaces/user.inteface';

class UserEntity {
  constructor(
    readonly id: number,
    readonly username: string,
    readonly firstname: string | null,
    readonly lastname: string | null,
    readonly hash: string,
    readonly storageVersion: StorageVersion,
  ) {}
}

@Injectable()
export class UsersService {
  private readonly users: UserEntity[] = [];

  public createUser(user: User, credentials: Credentials): IdentifiedUser {
    const { username, firstname, lastname } = user;
    const { hash, storageVersion } = credentials;

    if (this.isUsernameExist(username)) {
      throw new HttpException('Username alredy exists', HttpStatus.BAD_REQUEST);
    }

    const id = this.users.length;
    const entity = new UserEntity(
      id,
      username,
      firstname,
      lastname,
      hash,
      storageVersion,
    );
    this.users.push(entity);

    return { id, username, firstname, lastname };
  }

  public getByUsername(
    username: Username,
  ): (IdentifiedUser & Credentials) | null {
    return this.users.find(user => user.username === username) || null;
  }

  public isUsernameExist(username: Username): boolean {
    return !!this.users.find(user => user.username === username);
  }
}
