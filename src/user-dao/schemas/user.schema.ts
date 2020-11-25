import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import {
  EncryptedDataEntity,
  EncryptedDataSchema,
} from './encrypted-data.schema';
import { CredentialsEntity, CredentialsSchema } from './credentials.schema';

@Schema()
export class UserEntity {
  @Prop({ index: true, unique: true })
  username: string;

  @Prop({ type: CredentialsSchema, required: true })
  credentials: CredentialsEntity;

  @Prop({ type: EncryptedDataSchema, required: true })
  mobilephone: EncryptedDataEntity;

  constructor(
    username: string,
    mobilephone: EncryptedDataEntity,
    credentials: CredentialsEntity,
  ) {
    this.username = username;
    this.mobilephone = mobilephone;
    this.credentials = credentials;
  }
}

export type UserDocument = UserEntity & Document;

export const UserSchema = SchemaFactory.createForClass(UserEntity);
