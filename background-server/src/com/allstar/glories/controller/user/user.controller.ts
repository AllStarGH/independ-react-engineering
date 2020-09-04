import { Controller, Get, Post, Body } from '@nestjs/common';

@Controller('user')
export class UserController {
	@Get()
	index(): string {
		let html = '<div style="text-align:center;padding:1em 0 0 0;">';
		html += '<div class="user-index-tag">';
		html += '<h1>';
		html += '<em>';
		html += 'there are user.index';
		html += '</em>';
		html += '</h1>';
		html += '</div>';
		html += '</div>';
		return html;
	}

	@Get('interviewHandler')
	interviewHandler(): object {
		let gentleman = ({ name: 'victoria', salaries: 2300, gender: 'male', age: 23 ,phoneNum:'16602573234'});
		return gentleman;
	}

	// 注册
	@Post('signUp')
	async signUp(@Body() userData){
		console.dir(userData);

		return ({status:200,msg:'FINE',data:'default'});
	}
}
