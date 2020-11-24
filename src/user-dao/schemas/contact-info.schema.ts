import { Prop, raw, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import {
  DataCipherVersion,
  EncryptedData,
} from '../../common/interfaces/encrypted-data.interface';
import { UserEntity } from './user.schema';

@Schema()
export class ContactInfo {
  @Prop({ type: Types.ObjectId, ref: UserEntity.name, unique: true })
  user: Types.ObjectId;

  @Prop(
    raw({
      DEK: { type: Buffer },
      encryptedData: { type: Buffer },
      cipherVersion: { type: String, enum: Object.values(DataCipherVersion) },
    }),
  )
  mobilePhone: EncryptedData;
}

export type ContactInfoDocument = ContactInfo & Document;

export const ContactInfoSchema = SchemaFactory.createForClass(ContactInfo);
