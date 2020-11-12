export type Password = string;

export enum StorageVersion {
  ARGON2I,
}

export interface Credentials {
  readonly hash: string;
  readonly storageVersion: StorageVersion;
}
