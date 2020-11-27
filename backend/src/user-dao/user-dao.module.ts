import { Global, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SecurityModule } from 'src/security/security.module';
import { UserEntity, UserSchema } from './schemas/user.schema';
import { UserDaoProvider } from './user-dao.provider';

@Global()
@Module({
  imports: [
    MongooseModule.forFeature([{ name: UserEntity.name, schema: UserSchema }]),
    SecurityModule,
  ],
  providers: [UserDaoProvider],
  exports: [UserDaoProvider],
})
export class UserDaoModule {}
