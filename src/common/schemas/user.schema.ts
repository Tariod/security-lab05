import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Credentials, CredentialsSchema } from './credentials.schema';

@Schema()
export class User {
  @Prop({ index: true, unique: true })
  username: string;

  @Prop({ type: CredentialsSchema, required: true })
  credentials: Credentials;
}

export type UserDocument = User & Document;

export const UserSchema = SchemaFactory.createForClass(User);
