import { Injectable } from '@nestjs/common';
import { getConnection, getRepository } from "typeorm";

import { User } from './../entity/user.entity';

@Injectable()
export class Serv1Service {

	// 获取一位用户资料据ID
	async getOneUserById(userId:number):Promise<User>{
		let user = await getConnection()
			.createQueryBuilder()
			.select('user')
			.from(User, 'user')
			.where("user.id = :id", { id: userId })
			.printSql()
			.getOne();
		console.dir(user);
		return user;
	}

	// 获取全体用户
	async getUserList():Promise<User[]>{
		const users = await getRepository(User)
			.createQueryBuilder("user")
			.printSql()
			.getMany();
		console.dir(users);
		return users;
	}

	// 新增1位
	async saveOneUser(user: User): Promise<void> {
		let row = await getConnection()
			.createQueryBuilder()
			.insert()
			.into(User)
			.values(user)
			.printSql()
			.execute();
		console.log(row);
	}

	// 改1位,据id
	async updateOneUserById(userId: number, user: User): Promise<void>{
		let affects=await getConnection()
			.createQueryBuilder()
			.update(User)
			.set(user)
			.where("id = :id", { id: userId })
			.printSql()
			.execute();
		console.info(affects);
	}

	// 删除一位,据id
	async deleteOneUserById(userId: number): Promise<void> {
		let effects=await getConnection()
			.createQueryBuilder()
			.delete()
			.from(User)
			.where("id = :id", { id: userId })
			.printSql()
			.execute();
		console.info(effects);
	}

}
