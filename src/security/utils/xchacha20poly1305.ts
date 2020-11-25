import {
  crypto_aead_xchacha20poly1305_ietf_decrypt,
  crypto_aead_xchacha20poly1305_ietf_encrypt,
  crypto_aead_xchacha20poly1305_ietf_ABYTES as ABYTES,
  crypto_aead_xchacha20poly1305_ietf_KEYBYTES,
  crypto_aead_xchacha20poly1305_ietf_NPUBBYTES,
} from 'sodium-native';

export const KEY_SIZE = crypto_aead_xchacha20poly1305_ietf_KEYBYTES;
export const NONCE_SIZE = crypto_aead_xchacha20poly1305_ietf_NPUBBYTES;

export function xchacha20poly1305_encrypt(
  data: Buffer,
  nonce: Buffer,
  key: Buffer,
): Buffer {
  const ciphertext = Buffer.alloc(data.length + ABYTES);
  const ciphertextLength = crypto_aead_xchacha20poly1305_ietf_encrypt(
    ciphertext,
    data,
    null,
    null,
    nonce,
    key,
  );
  return ciphertext;
}

export function xchacha20poly1305_decrypt(
  ciphertext: Buffer,
  nonce: Buffer,
  key: Buffer,
): Buffer {
  const data = Buffer.alloc(ciphertext.length - ABYTES);
  const mlen = crypto_aead_xchacha20poly1305_ietf_decrypt(
    data,
    null,
    ciphertext,
    null,
    nonce,
    key,
  );
  return data.slice(0, mlen);
}
