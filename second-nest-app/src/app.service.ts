import { Injectable } from '@nestjs/common';
import * as fs from 'fs-extra';
import * as path from 'path';

@Injectable()
export class AppService {
	/**
	 * Gets the dir url.
	 *
	 * @return     {string}  The dir url.
	 */
	static getDirUrl(): string {
		let dirUrl = __dirname.replace(/dist/g, 'src/');
		console.log('static dirUrl ===' + dirUrl);
		return dirUrl;
	}

	/**
	 * { 实例变量 }
	 */
	private file_relative_path: string = './com/allstar/gits/resource/page/hello-index.html';

	/**
	 * Gets the hello.
	 *
	 * @return     {string}  The hello.
	 */
  	getHello(): string {
		let appServ = new AppService();
		let realUrl: string = path.resolve(AppService.getDirUrl(), appServ.file_relative_path);
		console.log('realUrl == ' + realUrl);

		let content = fs.readFileSync(realUrl, 'utf8');
		return content;
  	}
}
