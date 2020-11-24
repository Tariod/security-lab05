import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { CredentialsEntity, CredentialsSchema } from './credentials.schema';

@Schema()
export class UserEntity {
  @Prop({ index: true, unique: true })
  username: string;

  // TODO exclude
  @Prop({ type: CredentialsSchema, required: true })
  credentials: CredentialsEntity;

  constructor(username: string, credentials: CredentialsEntity) {
    this.username = username;
    this.credentials = credentials;
  }
}

export type UserDocument = UserEntity & Document;

export const UserSchema = SchemaFactory.createForClass(UserEntity);
