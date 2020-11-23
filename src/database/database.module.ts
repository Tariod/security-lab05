import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import mongoDatabaseConfig from 'config/mongo.database.config';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      imports: [ConfigModule.forFeature(mongoDatabaseConfig)],
      useFactory: async (configService: ConfigService) => ({
        ...configService.get<typeof mongoDatabaseConfig>('mongo.database'),
        retryAttempts: 5,
        retryDelay: 1000,
      }),
      inject: [ConfigService],
    }),
  ],
})
export class DatabaseModule {}
