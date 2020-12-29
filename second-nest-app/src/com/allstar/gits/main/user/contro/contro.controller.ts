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

	/**
	 * 获取全体用户列表
	 * http://localhost:1100/userContro/getUserList
	 *
	 * @class      Get (name)
	 */
	@Get('getUserList')
	async getUserList(): Promise<Result>{
		var list = await this.userServ1.getUserList();
		console.dir(list);

		list.forEach((val:User,i:number)=>{
			console.log(i, val);
			val.password = '';
			val.salt = '';
		})

		let res: Result = ({ code: 200, message: '', data: list });
		return res;
	}

	/*
	 * 账号登录测试
	 http://localhost:1100/userContro/loginingTest?account=2120442004844@qq.com&password=1234567
	 */
	@Get('loginingTest')
	async loginingTest(@Query() query): Promise<Result> {
		let res = this.userServ1.loginingServ(query);
		console.dir(res);
		return res;
	}

	/**
	 * { 登录 }
	 *
	 * @class      Post (name)
	 */
	@Post('logining')
	async logining(@Body() query): Promise<Result> {
		let res = this.userServ1.loginingServ(query);
		console.dir(res);
		return res;
	}

	/*
	 http://localhost:1100/userContro/regActTest?userName=信克勤&userEmail=1204404844@qq.com&phoneNum=13640219871&homeAddress=长城6700&password=123456
	 */
	@Get('regActTest')
	async regActTest(@Query() query): Promise<Result> {
		console.dir(query);
		let res = await this.userServ1.registerService(query);
		return res;
	}

	// 正式注册
	@Post('register')
	async register(@Body() userData: User): Promise<Result> {
		console.dir(userData);
		let res = await this.userServ1.registerService(userData);
		return res;
	}

}
