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
    ) {}

    /**
     * 获取全体用户列表
     * http://localhost:1100/userContro/getUserList
     *
     * @class      Get (name)
     */
    @Get('getUserList')
    async getUserList(): Promise < Result > {
        var list = await this.userServ1.getUserList();
        console.dir(list);

        list.forEach((val: User, i: number) => {
            console.log(i, val);
            val.password = '';
            val.salt = '';
        })

        let res: Result = ({ code: 200, message: '', data: list });
        return res;
    }

    /**
     * 获取用户信息据id
     * 
     * http://localhost:1100/userContro/getUserByUserid?userid=0
     * @param {[type]} 'getUserByUserid' [description]
     */
    @Get('getUserByUserid')
    async getUserByUserid(@Query('userid') uid): Promise < Result > {
        console.log('userId== ' + uid)
        // await可以用于等待一个async函数的返回值
        var user = await this.userServ1.getOneUserById(uid);
        console.dir(user);

        user.password = '';
        user.salt = '';
        let res: Result = ({ code: 200, message: "", data: user });
        return res;
    }

    /*
     * 账号登录测试
     http://localhost:1100/userContro/loginingTest?account=2120442004844@qq.com&password=1234567
     */
    @Get('loginingTest')
    async loginingTest(@Query() query): Promise < Result > {
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
    async logining(@Body() query): Promise < Result > {
        let res = this.userServ1.loginingServ(query);
        console.dir(res);
        return res;
    }

    /**
     * [Post description]
     * @param {[type]} 'revampUserInfo2' [description]
     */
    @Post('revampUserInfo2')
    async revampUserInfo2(@Body() query): Promise < Result > {
        console.info(query);

        // 检验电话和邮箱或昵称其中之一是否重复
        var verifies: Result = await this.userServ1.verifyForRevampInfo(query.phoneNum, query.userEmail, query.userName, query.id);
        console.log(verifies);
        if (verifies.code != 200) {
            return verifies;
        }

        var user = new User();
        user.userName = query.userName;
        user.userEmail = query.userEmail;
        user.phoneNum = query.phoneNum;
        user.homeAddress = query.homeAddress;
        console.log('user== ');
        console.dir(user);

        await this.userServ1.updateOneUserById(query.id, user);
        return ({ code: 200, message: "成功修改个人信息", data: user });
    }

    /**
     * http://localhost:1100/userContro/revampUserInfoTest?userName=信克勤&userEmail=1204404844@qq.com&phoneNum=13640219871&homeAddress=长城迪卡锡&id=9
     * 
     * @param {[type]} 'revampUserInfoTest' [description]
     */
    @Get('revampUserInfoTest')
    async revampUserInfoTest(@Query() query): Promise < Result > {
        console.info(query);

        // 检验电话和邮箱或昵称其中之一是否重复
        var verifies: Result = await this.userServ1.verifyForRevampInfo(query.phoneNum, query.userEmail, query.userName, query.id);
        console.log(verifies);
        if (verifies.code != 200) {
            return verifies;
        }

        var user = new User();
        user.userName = query.userName;
        user.userEmail = query.userEmail;
        user.phoneNum = query.phoneNum;
        user.homeAddress = query.homeAddress;
        console.log('user== ');
        console.dir(user);

        await this.userServ1.updateOneUserById(query.id, user);
        return ({ code: 200, message: "成功修改个人信息", data: user });
    }

    /**
     * http://localhost:1100/userContro/regActTest?userName=信克勤&userEmail=1204404844@qq.com&phoneNum=13640219871&homeAddress=长城6700&password=123456
     * @param {[type]} 'regActTest' [description]
     */
    @Get('regActTest')
    async regActTest(@Query() query): Promise < Result > {
        console.dir(query);
        let res = await this.userServ1.registerService(query);
        return res;
    }

    /**
     * http://localhost:1100/userContro/countColumnsTest?id=18&order=0&val=艾丝美拉达
     * 
     * @param {[type]} 'countColumnsTest' [description]
     */
    @Get('countColumnsTest')
    async countColumnsTest(@Query() query): Promise < Result > {
        console.dir(query);
        let res = await this.userServ1.countsVerifies(query.id, query.order, query.val);
        return res;
    }

    /**
     * 正式注册
     * 
     * @param {[type]} 'register' [description]
     */
    @Post('register')
    async register(@Body() userData: User): Promise < Result > {
        console.dir(userData);
        let res = await this.userServ1.registerService(userData);
        return res;
    }

    /**
     *  http://localhost:1100/userContro/alterPwdTest?oldPass=666&newPass=999&id=2
     *  
     * @param {[type]} 'countColumnsTest' [description]
     */
    @Get('alterPwdTest')
    async alterPwdTest(@Query() query): Promise < Result > {
        console.dir(query);

        let res = await this.userServ1.alterPasswordById(query.oldPass, query.newPass, query.id);
        return res;
    }

}