import { Injectable } from '@nestjs/common';
import { getConnection, getRepository } from "typeorm";

import { User } from './../entity/user.entity';
import { Result } from './../../../common/result.interface';
import getScrectText = require("./../../../utils/getScrectText");
import getUUID = require("./../../../utils/getUUID");

@Injectable()
export class Serv1Service {
    /**
     * 用户注册业务
     *
     * @param      {User}  userInfo  The user information
     */
    async registerService(userInfo: User): Promise < Result > {
        var res: Result = ({ code: null, message: '', data: null });
        console.dir(userInfo);

        // 检验用户名是否重复
        res = await this.verifyUserByOrder(userInfo.userName, 0);
        if (res.code !== 200) {
            console.dir(res);
            return res;
        }

        // 检验电子邮箱是否重复
        res = await this.verifyUserByOrder(userInfo.userEmail, 1);
        if (res.code !== 200) {
            console.dir(res);
            return res;
        }

        // 检验电话是否重复
        res = await this.verifyUserByOrder(userInfo.phoneNum, 2);
        if (res.code !== 200) {
            console.dir(res);
            return res;
        }

        let user = new User();
        user.userName = userInfo.userName;
        user.userEmail = userInfo.userEmail;
        user.phoneNum = userInfo.phoneNum;
        user.homeAddress = userInfo.homeAddress;

        user.salt = getUUID.getUUID();
        user.password = getScrectText.getScrectText(userInfo.password, user.salt);
        console.dir(user);

        await this.saveOneUser(user);
        console.dir(res);
        return res;
    }

    /**
     * 为修改个人信息检验电话/邮箱/昵称是否重复
     * 
     * @param  {string}  phoneNum  [description]
     * @param  {string}  userEmail [description]
     * @param  {string}  userName  [description]
     * @return {Promise}           [description]
     */
    async verifyForRevampInfo(phoneNum: string, userEmail: string, userName: string): Promise < Result > {

        var res: Result = ({ code: 200, message: "", data: null });

        // 检验用户名是否重复
        res = await this.verifyUserByOrder(userName, 0);
        if (res.code !== 200) {
            console.dir(res);
            return res;
        }

        // 检验电子邮箱是否重复
        res = await this.verifyUserByOrder(userEmail, 1);
        if (res.code !== 200) {
            console.dir(res);
            return res;
        }

        // 检验电话是否重复
        res = await this.verifyUserByOrder(phoneNum, 2);
        if (res.code !== 200) {
            console.dir(res);
            return res;
        }

        console.log('res=== ');
        console.dir(res);
        return res;
    }


    /**
     * 检验用户名字/电子邮箱/电话是否重复存在
     *
     * @param      {string}  para    The para
     * @param      {number}  order   The order
     */
    async verifyUserByOrder(para: string, order: number): Promise < Result > {
        var result: Result = ({ code: 200, message: '新用户注册成功', data: null });
        console.info('parameter === ' + para);

        var stringArr = ['user.userName = :userName',
            'user.userEmail = :userEmail',
            'user.phoneNum = :phoneNum'
        ];

        var con = await getConnection()
            .createQueryBuilder()
            .select('user')
            .from(User, 'user');

        // 检验用户名-0,检验电子邮箱-1,检验电话-2
        switch (order) {
            case 0:
                let usr1 = await con.where(stringArr[0], { userName: para })
                    .printSql()
                    .getOne();
                if (usr1 != null) {
                    console.dir(usr1);
                    console.info('该用户名已存在');
                    result.code = 412;
                    result.message = '该用户名已存在,请更换';
                }
                break;

            case 1:
                let usr2 = await con.where(stringArr[1], { userEmail: para })
                    .printSql()
                    .getOne();
                if (usr2 != null) {
                    console.dir(usr2);
                    console.info('该邮箱已存在');
                    result.code = 413;
                    result.message = '该邮箱已存在,请更换';
                }
                break;

            case 2:
                let usr3 = await con.where(stringArr[2], { phoneNum: para })
                    .printSql()
                    .getOne();
                if (usr3 != null) {
                    console.dir(usr3);
                    console.info('该电话已存在');
                    result.code = 414;
                    result.message = '该电话已存在,请更换';
                }
                break;
        }

        console.dir(result);
        return result;
    }

    /**
     * { 登录业务方法 }
     *
     * @param      {any}  userData  The user data
     */
    async loginingServ(userData: any): Promise < Result > {
        console.dir(userData);
        var result: Result = ({ code: 200, message: "", data: null });

        // 根据电话或邮箱查找,无结果便抛错,有结果则获取用户数据
        var user = await this.getUserByPhoneOrEmail(userData.account);
        if (user == null) {
            console.log('该用户不存在');
            result.code = 410;
            result.message = '该用户不存在';
            return result;
        }
        console.log("此用户存在.");
        console.log(user);

        // 校验密码,不匹配便抛错
        /*将提交的密码与盐值混合成密文,再与表中密文比对*/
        let newText = await getScrectText.getScrectText(userData.password, user.salt);
        if (newText != user.password) {
            console.log('密码不正确');
            result.code = 411;
            result.message = '密码不正确';
            return result;
        }
        console.log("密码正确.");
        console.log(user);
        user.salt = '';
        user.password = '';
        result.data = user;
        return result;
    }

    /**
     * 获取一位用户资料据电话or邮箱
     * Gets the user by phone or email.
     *
     * @param      {string}  arg     The argument
     */
    async getUserByPhoneOrEmail(arg: string): Promise < User > {
        let user = await getConnection()
            .createQueryBuilder()
            .select('user')
            .from(User, 'user')
            .where("user.phoneNum = :phoneNum", { phoneNum: arg })
            .orWhere("user.userEmail = :userEmail", { userEmail: arg })
            .printSql()
            .getOne();
        console.dir(user);
        return user;
    }

    /**
     * 获取一位用户资料据ID
     * Gets one user by identifier.
     *
     * @param      {number}  userId  The user identifier
     */
    async getOneUserById(userId: number): Promise < User > {
        console.log("user.id=== ", userId);
        let user = await getConnection()
            .createQueryBuilder()
            .select('user')
            .from(User, 'user')
            .where("user.id = :id", { id: userId })
            .printSql()
            .getOne();
        // console.dir(user);
        return user;
    }

    /**
     * 获取全体用户
     * Gets the user list.
     */
    async getUserList(): Promise < User[] > {
        let users = await getRepository(User)
            .createQueryBuilder("user")
            .printSql()
            .getMany();
        console.table(users);
        return users;
    }

    /**
     * 新增1位
     * Saves one user.
     *
     * @param      {User}  user    The user
     */
    async saveOneUser(user: User): Promise < void > {
        let row = await getConnection()
            .createQueryBuilder()
            .insert()
            .into(User)
            .values(user)
            .printSql()
            .execute();
        console.log(row);
    }

    /**
     *  改1位,据id
     *
     * @param      {number}  userId  The user identifier
     * @param      {User}    user    The user
     */
    async updateOneUserById(userId: number, user: User): Promise < void > {
        console.info('UserId==' + userId);
        let affects = await getConnection()
            .createQueryBuilder()
            .update(User)
            .set(user)
            .where("id = :id", { id: userId })
            .printSql()
            .execute();
        console.info(affects);
    }

    /**
     * 删除一位,据id
     *
     * @param      {number}  userId  The user identifier
     */
    async deleteOneUserById(userId: number): Promise < void > {
        let effects = await getConnection()
            .createQueryBuilder()
            .delete()
            .from(User)
            .where("id = :id", { id: userId })
            .printSql()
            .execute();
        console.info(effects);
    }

}