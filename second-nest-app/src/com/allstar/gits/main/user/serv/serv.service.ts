import { Injectable, HttpException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from './../entity/user.entity';

@Injectable()
export class ServService {
	// 使用泛型注入对应类型的存储库实例
	constructor(
		@InjectRepository(User)
		private readonly userRepo: Repository<User>,
		){}

	/**
	 * Creates an user.
	 *
	 * @param      {User}  user    The user
	 */
	async createUser(user:User):Promise<User>{
		// 插入数据时,删除id,以避免请求体内传入id
		delete user.id;
		return this.userRepo.save(user);
	}

	/**
	 * 删除
	 *
	 * @param      {number}  id      The identifier
	 */
	async deleteUser(id:number):Promise<void>{
		await this.findOneById(id);
		this.userRepo.delete(id);
	}

	/**
	 * 更新
	 *
	 * @param      {number}  id      The identifier
	 * @param      {User}    user    The user
	 */
	async updateUser(id:number,user:User):Promise<void>{
		// 更新数据时,删除id,以避免请求体内传入id
		delete user.id;
		this.userRepo.update(id,user);
	}

	/**
	 * Finds one by identifier.
	 * 根据id查询单行信息,若不存在则抛出404异常
	 *
	 * @param      {number}  id      The identifier
	 */
	private async findOneById(id:number):Promise<User>{
		const userInfo = await this.userRepo.findOne(id);
		if (!userInfo) {
			throw new HttpException(`id为${id}的用户不存在`,404);
		}
		return userInfo;
	}

}
