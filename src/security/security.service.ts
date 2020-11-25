import { Inject, Injectable } from '@nestjs/common';
import { KMS } from 'aws-sdk';
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
  constructor(@Inject(KEY_MANAGEMENT_SERVICE) private readonly kms: KMS) {}

  public async encrypt(data: Buffer): Promise<EncryptedData> {
    // TODO store KeyId secure
    const dek = await this.generateDataKey({
      KeyId: '6a0627df-fca8-4cd0-a1f3-e1c26254093a',
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
    }

    return null;
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
