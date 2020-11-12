export type UserID = number;

export type Username = string;

export interface User {
  readonly username: Username;
  readonly firstname: string | null;
  readonly lastname: string | null;
}

export interface IdentifiedUser extends User {
  readonly id: UserID;
}
