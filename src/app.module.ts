import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [AuthModule, ConfigModule.forRoot(), DatabaseModule, UsersModule],
})
export class AppModule {}
