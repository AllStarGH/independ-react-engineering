import { Controller, Get, Post } from '@nestjs/common';

@Controller('user')
export class UserController {
	@Get()
	index():string{
		return '这里是user模块的index';
	}

	@Get('interviewHandler')
	interviewHandler():object{
		let gentleman = ({ name: 'victoira', salaries: 2300, gender: 'male', age: 23 ,phoneNum:'16602573234'});
		return gentleman;
	}
}
