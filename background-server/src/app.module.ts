import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
/* ***************************** */
import { UserController } from './com/allstar/glories/controller/user/user.controller';
import { EnglishController } from './com/allstar/glories/controller/english/english.controller';
import { EnglishService } from './com/allstar/glories/service/english/english.service';
import { UserService } from './com/allstar/glories/service/user/user.service';
import { UserModule } from './com/allstar/glories/module/user/user.module';

@Module({
  imports: [UserModule],
  controllers: [AppController, UserController, EnglishController],
  providers: [AppService, EnglishService, UserService],
})
export class AppModule {}
