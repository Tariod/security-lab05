import { registerAs } from '@nestjs/config';
import { readFileSync } from 'fs';
import { join } from 'path';

const AWS_CREDENTIALS_FILENAME = '.env.aws-credentials';

export default registerAs('aws-connect', () => {
  const credentials = readFileSync(join('./', AWS_CREDENTIALS_FILENAME), {
    encoding: 'utf8',
    flag: 'r',
  });
  const [accessKeyId, secretAccessKey] = credentials.split('\n');
  return {
    credentials: { accessKeyId, secretAccessKey },
    region: process.env.AWS_REGION || 'eu-west-2',
    endpoint: process.env.AWS_ENDPOINT || 'http://localhost:8080',
  };
});
