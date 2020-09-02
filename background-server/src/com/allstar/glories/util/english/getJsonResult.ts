import * as path from 'path';
import { getJsonContext } from "./getJsonContext";

// var fileUrl = './../../json/english/article/article.json';
// const jsonFileUrl = path.resolve(`${__dirname}`, fileUrl);
// console.info('jsonFileUrl=== ' + jsonFileUrl);

/**
 * Gets the json result.
 *
 * @return     {<type>}  The json result.
 */
export const getJsonResult=(fileUrl:string)=>{
	//根据路径获取json字符串内容
	var str=getJsonContext(fileUrl);
	console.log(str);

	// 格式化json字符串为json对象
	var jsonResult = JSON.parse(str);
	console.dir(jsonResult);
	return jsonResult;
}

// getJsonResult(jsonFileUrl);