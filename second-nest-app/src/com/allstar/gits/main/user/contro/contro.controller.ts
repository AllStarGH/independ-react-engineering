import { Controller, Param, Post, Get, Body, Query } from '@nestjs/common';

import { User } from './../entity/user.entity';
import { ServService } from './../serv/serv.service';
import { Serv1Service } from './../serv1/serv1.service';

import { Result } from './../../../common/result.interface';

import getUUID = require("./../../../utils/getUUID");
import getScrectText = require("./../../../utils/getScrectText");

@Controller('userContro')
export class ControController {
	constructor(
		private readonly userService: ServService,
		private readonly userServ1: Serv1Service
		) { }

	/*
	 http://localhost:1100/userContro/regActTest?userName=信克勤&userEmail=1204404844@qq.com&phoneNum=13640219871&homeAddress=长城6700&password=123456
	 */
	@Get('regActTest')
	async regActTest(@Query() query): Promise<Result> {
		console.dir(query);

		let user1 = new User();

		user1.userName = query.userName;
		user1.userEmail = query.userEmail;
		user1.phoneNum = query.phoneNum;
		user1.homeAddress = query.homeAddress;

		user1.salt = getUUID.getUUID();
		user1.password = getScrectText.getScrectText(query.password, user1.salt);
		console.dir(user1);

		await this.userServ1.saveOneUser(user1);
		return ({ code: 200, message: '注册成功', data: '1' });
	}

	// 正式注册
	@Post('register')
	async register(@Body() userData: User): Promise<Result> {
		console.dir(userData);

		let user1 = new User();

		user1.userName = userData.userName;
		user1.userEmail = userData.userEmail;
		user1.phoneNum = userData.phoneNum;
		user1.homeAddress = userData.homeAddress;

		user1.salt = getUUID.getUUID();
		user1.password = getScrectText.getScrectText(userData.password, user1.salt);
		console.dir(user1);

		await this.userServ1.saveOneUser(user1);
 		return ({ code: 200, message: '注册成功', data: '1' });
	}

}
