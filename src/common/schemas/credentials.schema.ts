import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { PasswordHashingVersion } from '../interfaces/password-hashing-version.interface';

@Schema()
export class Credentials {
  @Prop({ required: true, get: value => value.buffer })
  hash: Buffer;

  @Prop({ enum: Object.values(PasswordHashingVersion), required: true })
  hashingVersion: string;
}

export type CredentialsDocument = Credentials & Document;

export const CredentialsSchema = SchemaFactory.createForClass(Credentials);
