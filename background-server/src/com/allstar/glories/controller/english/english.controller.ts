import { Controller, Get, Param, Query } from '@nestjs/common';
import * as path from 'path';

import { getJsonResult } from './../../util/english/getJsonResult';

@Controller('english')
export class EnglishController {
	/**
	 * Gets the current url.
	 */
	static getCurrentUrl():string{
		let currentUrl = __dirname.replace(/dist\//g, '');
		currentUrl = currentUrl.replace(/\/com/, '/src/com');
		console.log('static currentUrl ===' + currentUrl);
		return currentUrl;
	}

	/**
	 * 实例变量
	 */
	private json_dir_path: string = './../../json/english/';

	/**
	 * http://localhost:1440/english/getEnglishNote?filePath=noun/nouns.json
	 *
	 * @class      Get (name)
	 */
	@Get('getEnglishNote')
	getEnglishNote(@Query('filePath') filePath): string {
		console.log('file path == ' + filePath);

		var englishController = new EnglishController();

		let localUrl = path.resolve(EnglishController.getCurrentUrl(), englishController.json_dir_path);
		console.log('localUrl == ' + localUrl);

		let realUrl: string = path.resolve(localUrl, filePath);
		console.log('realUrl == ' + realUrl);

		var result = getJsonResult(realUrl);
		console.log(result);
		return result;
	}

	/**
	 * { function_description }
	 *
	 * @class      Get (name)
	 */
	@Get('getDirPath')
	getDirPath():string{
		let dirPath = __dirname;
		return dirPath;
	}

}
