import { registerAs } from '@nestjs/config';

export default registerAs('aws-connect', () => ({
  credentials: {
    accessKeyId: 'AKIAIOSFODNN7EXAMPLE',
    secretAccessKey: 'wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY',
  },
  region: 'eu-west-2',
  endpoint: 'http://localhost:8080',
}));
