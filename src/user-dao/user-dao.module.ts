import { Global, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserEntity, UserSchema } from './schemas/user.schema';
import { UserDaoProvider } from './user-dao.provider';

@Global()
@Module({
  imports: [
    MongooseModule.forFeature([{ name: UserEntity.name, schema: UserSchema }]),
  ],
  providers: [UserDaoProvider],
  exports: [UserDaoProvider],
})
export class UserDaoModule {}
