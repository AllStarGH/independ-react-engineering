import { Module } from '@nestjs/common';
import { UserService } from './../../service/user/user.service';
import { UserController } from './../../controller/user/user.controller';

@Module({
	providers: [UserService],
	exports: [UserService],
	controllers:[UserController]
})
export class UserModule {}
