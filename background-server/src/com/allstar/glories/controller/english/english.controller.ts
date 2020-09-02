import { Controller, Get, Param, Query } from '@nestjs/common';
import * as path from 'path';

import { getJsonResult } from './../../util/english/getJsonResult';

@Controller('english')
export class EnglishController {
	/**
	 * 实例变量
	 */
	private json_dir_path: string = '/home/user/001/workspaces/js-workspace/independ-react-engineering/background-server/src/com/allstar/glories/json/english/';

	/**
	 * http://localhost:1440/english/findJson?filePath=noun/nouns.json
	 *
	 * @class      Get (name)
	 */
	@Get('findJson')
	findJson(@Query('filePath') filePath): string {
		console.log('file path == ' + filePath);

		var englishController = new EnglishController();

		let realUrl: string = path.resolve(englishController.json_dir_path, filePath);
		console.log('realUrl == ' + realUrl);

		var result = getJsonResult(realUrl);
		console.log(result);
		return result;
	}
}
