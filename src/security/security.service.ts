import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { KMS } from 'aws-sdk';
import awsKeyIdConfig from 'config/aws-key-id.config';
import {
  EncryptedData,
  DataCipherVersion,
} from 'src/common/interfaces/encrypted-data.interface';
import { KEY_MANAGEMENT_SERVICE } from './security.constants';
import { randomBytesBuffer } from './utils/random-bytes-buffer';
import {
  KEY_SIZE,
  NONCE_SIZE,
  xchacha20poly1305_decrypt,
  xchacha20poly1305_encrypt,
} from './utils/xchacha20poly1305';

@Injectable()
export class SecurityService {
  constructor(
    @Inject(awsKeyIdConfig.KEY)
    private readonly keyIdConfig: ConfigType<typeof awsKeyIdConfig>,
    @Inject(KEY_MANAGEMENT_SERVICE)
    private readonly kms: KMS,
  ) {}

  public async encrypt(data: Buffer): Promise<EncryptedData> {
    const dek = await this.generateDataKey({
      KeyId: this.keyIdConfig.keyId,
      NumberOfBytes: KEY_SIZE,
    });
    const nonce = await randomBytesBuffer(NONCE_SIZE);
    const ciphertext = xchacha20poly1305_encrypt(
      data,
      nonce,
      dek.Plaintext as Buffer,
    );
    return {
      dek: dek.CiphertextBlob as Buffer,
      nonce,
      ciphertext,
      cipherVersion: DataCipherVersion.XCHaCha20_Poly1305,
    };
  }

  public async decrypt(encryptedData: EncryptedData): Promise<Buffer | null> {
    const { Plaintext: dek } = await this.decryptDEK({
      CiphertextBlob: encryptedData.dek,
    });
    const { nonce, ciphertext, cipherVersion } = encryptedData;
    if (cipherVersion === DataCipherVersion.XCHaCha20_Poly1305) {
      return xchacha20poly1305_decrypt(ciphertext, nonce, dek as Buffer);
    } else {
      throw new HttpException(
        'Wrong cipher version',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  private generateDataKey(
    params: KMS.GenerateDataKeyRequest,
  ): Promise<KMS.GenerateDataKeyResponse> {
    return new Promise((resolve, reject) => {
      this.kms.generateDataKey(params, (err, data) => {
        if (err) reject(err);
        resolve(data);
      });
    });
  }

  private decryptDEK(params: KMS.DecryptRequest): Promise<KMS.DecryptResponse> {
    return new Promise((resolve, reject) => {
      this.kms.decrypt(params, (err, data) => {
        if (err) reject(err);
        resolve(data);
      });
    });
  }
}
