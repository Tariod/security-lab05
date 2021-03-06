import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { PasswordHashingVersion } from '../../common/interfaces/credentials.interface';
import {
  EncryptedDataEntity,
  EncryptedDataSchema,
} from './encrypted-data.schema';

@Schema({ _id: false })
export class CredentialsEntity {
  @Prop({ type: EncryptedDataSchema, required: true })
  hash: EncryptedDataEntity;

  @Prop({ enum: Object.values(PasswordHashingVersion), required: true })
  hashingVersion: string;
}

export type CredentialsDocument = CredentialsEntity & Document;

export const CredentialsSchema = SchemaFactory.createForClass(
  CredentialsEntity,
);
