import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { DataCipherVersion } from '../../common/interfaces/encrypted-data.interface';

const mapBinDataToBuffer = ({ buffer }) => buffer;

@Schema({ _id: false })
export class EncryptedDataEntity {
  @Prop({ required: true, get: mapBinDataToBuffer })
  dek: Buffer;

  @Prop({ required: true, get: mapBinDataToBuffer })
  nonce: Buffer;

  @Prop({ required: true, get: mapBinDataToBuffer })
  ciphertext: Buffer;

  @Prop({ enum: Object.values(DataCipherVersion), required: true })
  cipherVersion: DataCipherVersion;
}

export type EncryptedDataDocument = EncryptedDataEntity & Document;

export const EncryptedDataSchema = SchemaFactory.createForClass(
  EncryptedDataEntity,
);
