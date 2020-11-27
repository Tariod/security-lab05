import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { ServeStaticModule } from '@nestjs/serve-static';
import { AuthModule } from './auth/auth.module';
import mongoDatabaseConfig from 'config/mongo.database.config';
import { UserDaoModule } from './user-dao/user-dao.module';
import { SearchModule } from './search/search.module';
import { join } from 'path';

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
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', '..', 'client'),
      exclude: ['/api*'],
    })
  ],
})
export class AppModule {}
