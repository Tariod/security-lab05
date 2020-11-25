export enum DataCipherVersion {
  XCHaCha20_Poly1305 = 'XChaCha20-Poly1305',
}

export interface EncryptedData {
  dek: Buffer;
  nonce: Buffer;
  ciphertext: Buffer;
  cipherVersion: DataCipherVersion;
}
