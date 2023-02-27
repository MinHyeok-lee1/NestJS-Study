import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { MonsterModule } from './monster/monster.module';
import { DatabaseModule } from './database.module';

@Module({
  imports: [UserModule, MonsterModule, DatabaseModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
