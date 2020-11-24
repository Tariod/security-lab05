import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import mongoDatabaseConfig from 'config/mongo.database.config';
import { UserDaoModule } from './user-dao/user-dao.module';
import { SearchModule } from './search/search.module';

@Module({
  imports: [
    AuthModule,
    ConfigModule.forRoot(),
    MongooseModule.forRootAsync({
      imports: [ConfigModule.forFeature(mongoDatabaseConfig)],
      useFactory: async (configService: ConfigService) => ({
        ...configService.get<typeof mongoDatabaseConfig>('mongo.database'),
        autoIndex: true,
        useCreateIndex: true,
        retryAttempts: 5,
        retryDelay: 1000,
      }),
      inject: [ConfigService],
    }),
    UserDaoModule,
    SearchModule,
  ],
})
export class AppModule {}
