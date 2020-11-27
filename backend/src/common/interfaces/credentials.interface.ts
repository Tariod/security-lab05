export enum PasswordHashingVersion {
  ARGON2I = 'ARGON2I',
}

export interface Credentials {
  hash: string;
  hashingVersion: PasswordHashingVersion;
}
