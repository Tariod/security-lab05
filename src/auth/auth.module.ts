import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PasswordEncryptionService } from './password-encryption.service';

@Module({
  controllers: [AuthController],
  providers: [AuthService, PasswordEncryptionService],
})
export class AuthModule {}
