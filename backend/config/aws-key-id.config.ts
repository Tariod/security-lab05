import { registerAs } from '@nestjs/config';
import { readFileSync } from 'fs';
import { join } from 'path';

const AWS_KEY_ID_FILENAME = '.env.aws-key-id';

export default registerAs('aws-key-id', () => {
  const file = readFileSync(join('./', AWS_KEY_ID_FILENAME), {
    encoding: 'utf8',
    flag: 'r',
  });
  const [keyId] = file.split('\n');
  return { keyId };
});
