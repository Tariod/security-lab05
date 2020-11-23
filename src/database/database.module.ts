import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import mongoDatabaseConfig from 'config/mongo.database.config';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule.forFeature(mongoDatabaseConfig)],
      name: 'mongo_connection',
      useFactory: (configService: ConfigService) => ({
        ...configService.get<typeof mongoDatabaseConfig>('mongo.database'),
        type: 'mongodb',
        entities: [],
        synchronize: true,
        retryAttempts: 5,
        retryDelay: 1000,
      }),
      inject: [ConfigService],
    }),
  ],
})
export class DatabaseModule {}
