import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { KMS, Credentials } from 'aws-sdk';
import awsConnectConfig from 'config/aws-connect.config';
import awsKeyIdConfig from 'config/aws-key-id.config';
import { KEY_MANAGEMENT_SERVICE } from './security.constants';
import { SecurityService } from './security.service';

const KeyManagementService = {
  provide: KEY_MANAGEMENT_SERVICE,
  useFactory: async (configService: ConfigService) => {
    const { credentials, ...options } = configService.get<
      ReturnType<typeof awsConnectConfig>
    >('aws-connect');

    return new KMS({
      ...options,
      apiVersion: '2014-11-01',
      credentials: new Credentials(credentials),
    });
  },
  inject: [ConfigService],
};

@Module({
  imports: [
    ConfigModule.forFeature(awsConnectConfig),
    ConfigModule.forFeature(awsKeyIdConfig),
  ],
  providers: [KeyManagementService, SecurityService],
  exports: [SecurityService],
})
export class SecurityModule {}
