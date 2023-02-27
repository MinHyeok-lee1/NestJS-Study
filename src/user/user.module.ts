import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { usersProviders } from './users.providers';
import { DatabaseModule } from 'src/database.module';

@Module({
  imports: [UserModule, DatabaseModule],
  controllers: [UserController],
  providers: [UserService, ...usersProviders],
})
export class UserModule {}
