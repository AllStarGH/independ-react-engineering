import { Controller, Param, Post, Get, Body, Query } from '@nestjs/common';

import { User } from './../entity/user.entity';
import { ServService } from './../serv/serv.service';
import { Serv1Service } from './../serv1/serv1.service';

import { Result } from './../../../common/result.interface';

@Controller('userContro')
export class ControController {
	constructor(
		private readonly userService: ServService,
		private readonly userServ1: Serv1Service
		) { }

	/*
	 http://localhost:1100/userContro/regActTest?userName=李克勤&userEmail=15496414844@qq.com&phoneNum=17640219871&homeAddress=楚王国都城&password=123456
	 */
	@Get('regActTest')
	async regActTest(@Query() query): Promise<Result> {
		console.dir(query);

		var user1 = new User();

		user1.userName = query.userName;
		user1.userEmail = query.userEmail;
		user1.phoneNum = query.phoneNum;
		user1.homeAddress = query.homeAddress;
		user1.password = query.password;
		user1.salt = query.userEmail + query.password + query.phoneNum;
		console.dir(user1);

		await this.userServ1.saveOneUser(user1);
		return ({ code: 200, message: '注册成功', data: '1' });
	}

	// 正式注册
	@Post('register')
	async register(@Body() userData: User): Promise<Result> {
		console.dir(userData);
		return ({ code: 200, message: '注册成功', data: '1' });
	}

}
